import { clearDate } from "@/helpers/date";
import { moneyFormat } from "@/helpers/money";
import { verifyIncomeStatus } from "@/helpers/payment-status";
import { cn } from "@/lib/utils";
import { Text, TouchableOpacity, View } from "react-native";
import { IncomeCardStatus } from "./status";
import { IncomeCardProps } from "./types";

export function IncomeCard(props: IncomeCardProps) {
  const { data, onPress } = props;
  const { status, daysLate } = verifyIncomeStatus(data);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        className={cn(
          "flex flex-col p-3 bg-white rounded-lg gap-2 mb-4",
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
            {moneyFormat(data.income)} Kz
          </Text>
          <IncomeCardStatus status={status} daysLate={daysLate} />
        </View>
        <View className="flex flex-row items-start justify-between">
          <Text
            className={cn(
              "text-xs text-gray-500",
              status === "LATE" && "text-white",
            )}
          >{`${data?.number}º | ${data.investment.name} (${data.investment.id})`}</Text>
          <Text
            className={cn(
              "text-xs text-gray-500",
              status === "LATE" && "text-white",
            )}
          >
            {clearDate(data.incomeDate).toDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
