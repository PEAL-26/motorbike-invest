import { colors } from "@/constants/colors";
import { INCOME_STATUS_ENUM } from "@/constants/income";
import {
  formatDateForDatabase,
  formatDateFromDateObject,
  inputDateFormat,
  isValidDate,
} from "@/helpers/date";
import { moneyFormat } from "@/helpers/money";
import { verifyIncomeStatus } from "@/helpers/payment-status";
import { cn } from "@/lib/utils";
import { getIncomeById, incomeChangeStatus } from "@/services/incomes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IncomeCardStatus } from "../elements/income-card";
import { DefaultModal } from "./default-modal";

type IncomeFormData = {
  investment: { id: number; name: string };
  code: string;
  number: number;
  income: number;
  status?: INCOME_STATUS_ENUM | null;
  paymentDate?: string | null;
  incomeDate: string;
  createdAt: string;
  updatedAt: string;
};

interface Props {
  show?: boolean;
  onClose?(): void;
  incomeId?: number;
}

export function IncomeModal(props: Props) {
  const { incomeId, show, onClose } = props;

  const { data, isLoading } = useQuery({
    queryFn: () => (incomeId ? getIncomeById(incomeId) : null),
    queryKey: ["income", incomeId],
  });
  const { status, daysLate } = verifyIncomeStatus(data);

  const [formData, setFormData] = useState<Partial<IncomeFormData> | null>(
    null,
  );
  const [errorDate, setErrorDate] = useState(false);
  const queryClient = useQueryClient();
  const handleSave = async () => {
    try {
      setErrorDate(false);
      let newStatus = null;
      let paymentDate: Date | null = null;

      if (status === "PAID") {
        // Anular pagamento
        newStatus = INCOME_STATUS_ENUM.PENDING;
        paymentDate = null;
      } else {
        // Marcar como pago
        if (!formData?.paymentDate) {
          throw new Error("Data de pagamento obrigatória.");
        }

        if (!isValidDate(formData?.paymentDate)) {
          setErrorDate(true);
          throw new Error("Data de pagamento inválida.");
        }

        newStatus = INCOME_STATUS_ENUM.PAID;
        paymentDate = new Date(
          formatDateForDatabase(formData.paymentDate) || "",
        );
      }

      const payload = {
        id: incomeId || 0,
        paymentDate,
        status: newStatus,
      };

      await incomeChangeStatus(payload);
      queryClient.invalidateQueries({
        queryKey: ["income", incomeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["incomes"],
      });
      onClose?.();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Oops! Alguma coisa deu errado.", error?.message);
    }
  };

  const changeFormData = (data: Partial<Record<keyof IncomeFormData, any>>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (incomeId && data) {
      setFormData({
        investment: data.investment,
        code: data.code,
        number: Number(data.number),
        status: data?.status,
        paymentDate: data.paymentDate
          ? formatDateFromDateObject(data.paymentDate)
          : formatDateFromDateObject(new Date().toISOString()),
        incomeDate: formatDateFromDateObject(data.incomeDate),
      });
    }
  }, [data, incomeId]);

  return (
    <DefaultModal title="Rendimento" show={show} onClose={onClose}>
      {isLoading && (
        <View className="p-5 flex-col justify-center items-center h-20">
          <ActivityIndicator size={20} animating color={colors.light.tint} />
        </View>
      )}
      {!isLoading && !data && (
        <View className="flex-row items-center justify-center h-20">
          <Text>Rendimento não encontrado!</Text>
        </View>
      )}
      {!isLoading && data && (
        <View className="p-5 flex-col gap-3">
          <View
            className={cn(
              "justify-center items-center rounded py-4 ",
              status === "LATE" && "bg-red-400",
            )}
          >
            <IncomeCardStatus daysLate={daysLate} status={status} />
          </View>

          <View className="gap-3">
            <View className="gap-3 flex-row items-center justify-center">
              <View className="flex-1">
                <Text className="font-bold">Nº</Text>
                <Text>{data.number}º</Text>
              </View>

              <View className="flex-1">
                <Text className="font-bold">Contrato</Text>
                <Text>{data.investment.name}</Text>
              </View>
            </View>

            <View className="gap-3 flex-row items-center justify-center">
              <View className="flex-1">
                <Text className="font-bold">Rendimento mensal</Text>
                <Text>{moneyFormat(data?.income)} Kz</Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold">Data de Rendimento</Text>
                <Text>{formatDateFromDateObject(data.incomeDate)}</Text>
              </View>
            </View>

            <View className="gap-3 flex-row items-center justify-center">
              {data.paymentDate && (
                <View className="flex-1">
                  <Text className="font-bold">Data de Pagamento</Text>
                  <Text>{formatDateFromDateObject(data.paymentDate)}</Text>
                </View>
              )}
            </View>

            {status !== "PAID" && (
              <View className="">
                <Text className="font-bold">Data do pagamento</Text>
                <TextInput
                  keyboardType="numeric"
                  placeholder={new Date().toLocaleDateString()}
                  className="border rounded px-2 text-xs border-gray-200 py-1"
                  maxLength={11}
                  value={inputDateFormat(
                    formData?.paymentDate
                      ? String(formData.paymentDate).trim()
                      : "",
                  )}
                  onChangeText={(paymentDate) =>
                    changeFormData({ paymentDate })
                  }
                />
                {errorDate && (
                  <Text className="text-xs text-red-500">
                    Formato: dd/mm/yyyy
                  </Text>
                )}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={{
              backgroundColor:
                status === INCOME_STATUS_ENUM.PAID ? "#dc2626" : "#16a34a",
            }}
            className="p-2 rounded justify-center items-center"
            activeOpacity={0.7}
            onPress={handleSave}
          >
            <Text className="text-white">
              {status === INCOME_STATUS_ENUM.PAID
                ? "Anular Pagamento"
                : "Marcar Como Pago"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </DefaultModal>
  );
}
