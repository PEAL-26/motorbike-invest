import { moneyFormat } from "@/helpers/money";
import { cn } from "@/lib/utils";
import { Text, TouchableOpacity, View } from "react-native";
import { IncomeCardStatus } from "./status";
import { INCOME_STATUS_ENUM, IncomeCardProps } from "./types";

export function IncomeCard(props: IncomeCardProps) {
  const { data, onPress } = props;

  const verifyStatus = () => {
    const date = new Date().getTime();

    if (
      data.status === INCOME_STATUS_ENUM.PENDING &&
      !data.paymentDate &&
      date > data.incomeDate.getTime()
    ) {
      return "LATE";
    }

    if (data.status === INCOME_STATUS_ENUM.PAID) {
      return "PAID";
    }

    return "PENDING";
  };

  const status = verifyStatus();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        className={cn(
          "flex flex-col p-3 bg-white rounded-lg gap-2",
          status === "LATE" && "bg-red-400",
        )}
      >
        <View className="flex flex-row items-center justify-between">
          <Text
            className={cn(
              "text-light-tint font-bold",
              status === "LATE" && "text-white",
            )}
          >
            {moneyFormat(data.income)}
          </Text>
          <IncomeCardStatus status={status} incomeDate={data.incomeDate} />
        </View>
        <View className="flex flex-row items-start justify-between">
          <Text
            className={cn(
              "text-xs text-gray-500",
              status === "LATE" && "text-white",
            )}
          >{`${data.number} | ${data.code}`}</Text>
          <Text
            className={cn(
              "text-xs text-gray-500",
              status === "LATE" && "text-white",
            )}
          >
            {data.incomeDate.toDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
