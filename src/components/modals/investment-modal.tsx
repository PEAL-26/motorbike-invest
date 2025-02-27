import { colors } from "@/constants/colors";
import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";
import {
  formatDateForDatabase,
  formatDateFromDateObject,
  isValidDate,
} from "@/helpers/date";
import { getInvestmentById } from "@/services/investments/get-by-id";
import { registerInvestment } from "@/services/investments/register";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DefaultModal } from "./default-modal";

interface Props {
  show?: boolean;
  onClose?(): void;
  investmentId?: number;
}

type InvestmentFormData = {
  name: string;
  amount: number;
  income: number;
  profit: number;
  bonus?: number;
  duration: number;
  startDate: string;
  endDate: string;
  status: INVESTMENT_STATUS_ENUM;
};

type DateTypes = "startDate" | "endDate";
export function InvestmentModal(props: Props) {
  const { investmentId, show, onClose } = props;

  const { data, isLoading } = useQuery({
    queryFn: () => (investmentId ? getInvestmentById(investmentId) : null),
    queryKey: ["investment", investmentId],
  });

  const [formData, setFormData] = useState<Partial<InvestmentFormData> | null>({
    status: INVESTMENT_STATUS_ENUM.PENDING,
  });
  const [errorDate, setErrorDate] = useState<Partial<
    Record<DateTypes, boolean>
  > | null>(null);
  const queryClient = useQueryClient();
  const handleSave = async () => {
    try {
      setErrorDate(null);

      if (!formData?.name?.trim()) throw new Error("Nome obrigatório.");
      if (!formData?.duration) throw new Error("Duração obrigatória.");
      if (!formData?.startDate) throw new Error("Data de início obrigatória.");
      if (!isValidDate(formData?.startDate)) {
        setErrorDate({ startDate: true });
        throw new Error("Data de início inválida.");
      }
      if (!formData?.endDate) throw new Error("Data de término obrigatória.");
      if (!isValidDate(formData?.endDate)) {
        setErrorDate({ endDate: true });
        throw new Error("Data de término inválida.");
      }
      if (!formData?.amount)
        throw new Error("Valor do investimento obrigatório.");
      if (!formData?.income) throw new Error("Rendimento mensal obrigatório.");
      if (!formData?.profit) throw new Error("Lucro obrigatório.");

      const payload = {
        id: investmentId,
        name: formData.name,
        amount: Number(formData.amount),
        income: Number(formData.income),
        profit: Number(formData.profit),
        bonus: formData.bonus ? Number(formData.bonus) : undefined,
        duration: Number(formData.duration),
        startDate: new Date(formatDateForDatabase(formData.startDate) || ""),
        endDate: new Date(formatDateForDatabase(formData.endDate) || ""),
        status: formData?.status || INVESTMENT_STATUS_ENUM.PENDING,
      };

      await registerInvestment(payload);
      queryClient.invalidateQueries({
        queryKey: ["investments", investmentId],
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

  const changeFormData = (
    data: Partial<Record<keyof InvestmentFormData, any>>,
  ) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  useEffect(() => {
    if (investmentId && data) {
      setFormData({
        name: data.name,
        amount: Number(data.amount),
        income: Number(data.income),
        profit: Number(data.profit),
        bonus: data.bonus ? Number(data.bonus) : undefined,
        duration: Number(data.duration),
        startDate: formatDateFromDateObject(data.startDate),
        endDate: formatDateFromDateObject(data.endDate),
        status: data?.status || INVESTMENT_STATUS_ENUM.PENDING,
      });
    }
  }, [data, investmentId]);

  const statusColor = (status: INVESTMENT_STATUS_ENUM) => {
    const color = {
      PENDING: status === formData?.status ? "#a16207" : "#ca8a04",
      ACTIVE: status === formData?.status ? "#15803d" : "#16a34a",
      FINISHED: status === formData?.status ? "#b91c1c" : "#dc2626",
    }[status];

    return color;
  };

  return (
    <DefaultModal title="Investimento" show={show} onClose={onClose}>
      {isLoading && (
        <View className="p-5 flex-col justify-center items-center h-20">
          <ActivityIndicator size={20} animating color={colors.light.tint} />
        </View>
      )}
      {!isLoading && (
        <View className="p-5 flex-col gap-3">
          <View className="flex-row justify-center gap-4 items-center">
            <View
              style={{
                borderColor:
                  formData?.status === "PENDING"
                    ? statusColor(INVESTMENT_STATUS_ENUM.PENDING)
                    : "transparent",
              }}
              className="rounded-md border-2 p-1"
            >
              <TouchableOpacity
                style={{
                  backgroundColor: statusColor(INVESTMENT_STATUS_ENUM.PENDING),
                }}
                className="rounded-md justify-center items-center w-20 h-20 "
                activeOpacity={0.7}
                onPress={() =>
                  changeFormData({ status: INVESTMENT_STATUS_ENUM.PENDING })
                }
              >
                <Text className="text-white text-xs">Pendente</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderColor:
                  formData?.status === "ACTIVE"
                    ? statusColor(INVESTMENT_STATUS_ENUM.ACTIVE)
                    : "transparent",
              }}
              className="rounded-md border-2 p-1"
            >
              <TouchableOpacity
                style={{
                  backgroundColor: statusColor(INVESTMENT_STATUS_ENUM.ACTIVE),
                }}
                className="rounded-md justify-center items-center w-20 h-20 "
                activeOpacity={0.7}
                onPress={() =>
                  changeFormData({ status: INVESTMENT_STATUS_ENUM.ACTIVE })
                }
              >
                <Text className="text-white text-xs">Activo</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderColor:
                  formData?.status === "FINISHED"
                    ? statusColor(INVESTMENT_STATUS_ENUM.FINISHED)
                    : "transparent",
              }}
              className="rounded-md border-2 p-1"
            >
              <TouchableOpacity
                style={{
                  backgroundColor: statusColor(INVESTMENT_STATUS_ENUM.FINISHED),
                }}
                className="rounded-md justify-center items-center w-20 h-20 "
                activeOpacity={0.7}
                onPress={() =>
                  changeFormData({ status: INVESTMENT_STATUS_ENUM.FINISHED })
                }
              >
                <Text className="text-white text-xs">Finalizado</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="font-bold">Nome</Text>
              <TextInput
                placeholder="Nome"
                className="border rounded px-2 text-xs border-gray-200"
                value={formData?.name || ""}
                onChangeText={(name) => changeFormData({ name })}
              />
            </View>
            <View className="">
              <Text className="font-bold">Duração</Text>
              <View className="flex-row border rounded text-xs border-gray-200">
                <View className="flex flex-row items-center gap-2">
                  <TextInput
                    placeholder="6"
                    keyboardType="number-pad"
                    className="w-20 text-center px-2 text-xs border-gray-200"
                    value={formData?.duration ? String(formData.duration) : ""}
                    onChangeText={(duration) => changeFormData({ duration })}
                  />
                  <Text className="text-xs bg-gray-200 h-full text-center align-middle px-2">
                    Mês(s)
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="font-bold">Data de início</Text>
              <TextInput
                keyboardType="numeric"
                placeholder={new Date().toLocaleDateString()}
                className="border rounded px-2 text-xs border-gray-200"
                maxLength={11}
                value={
                  formData?.startDate ? String(formData.startDate).trim() : ""
                }
                onChangeText={(startDate) => changeFormData({ startDate })}
              />
              {errorDate?.startDate && (
                <Text className="text-xs text-red-500">
                  Formato: dd/mm/yyyy
                </Text>
              )}
            </View>

            <View className="flex-1">
              <Text className="font-bold">Data de término</Text>
              <TextInput
                keyboardType="numeric"
                placeholder={new Date(
                  new Date().setMonth(new Date().getMonth() + 6),
                ).toLocaleDateString()}
                className="border rounded px-2 text-xs border-gray-200"
                maxLength={11}
                value={formData?.endDate ? String(formData.endDate).trim() : ""}
                onChangeText={(endDate) => changeFormData({ endDate })}
              />
              {errorDate?.endDate && (
                <Text className="text-xs text-red-500">
                  Formato: dd/mm/yyyy
                </Text>
              )}
            </View>
          </View>

          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="font-bold">Valor Investimento</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="0,00 Kz"
                className="border rounded px-2 text-xs border-gray-200"
                value={formData?.amount ? String(formData.amount) : ""}
                onChangeText={(amount) => changeFormData({ amount })}
              />
            </View>

            <View className="flex-1">
              <Text className="font-bold">Rendimento Mensal</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="0,00 Kz"
                className="border rounded px-2 text-xs border-gray-200"
                value={formData?.income ? String(formData.income) : ""}
                onChangeText={(income) => changeFormData({ income })}
              />
            </View>
          </View>

          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="font-bold">Lucro</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="0,00 Kz"
                className="border rounded px-2 text-xs border-gray-200"
                value={formData?.profit ? String(formData.profit) : ""}
                onChangeText={(profit) => changeFormData({ profit })}
              />
            </View>

            <View className="flex-1">
              <Text className="font-bold">Bónus</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="0,00 Kz"
                className="border rounded px-2 text-xs border-gray-200"
                value={formData?.bonus ? String(formData.bonus) : ""}
                onChangeText={(bonus) => changeFormData({ bonus })}
              />
            </View>
          </View>

          <View className="flex flex-row items-center gap-3">
            <TouchableOpacity
              className="p-2 rounded bg-green-600 justify-center items-center flex-1"
              activeOpacity={0.7}
              onPress={handleSave}
            >
              <Text className="text-white">Guardar</Text>
            </TouchableOpacity>
            {investmentId && data && (
              <TouchableOpacity
                className="p-2"
                activeOpacity={0.7}
                onPress={handleSave}
              >
                <Trash2Icon
                  size={16}
                  color="#ef4444"
                  className="size-4 text-red-500"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </DefaultModal>
  );
}
