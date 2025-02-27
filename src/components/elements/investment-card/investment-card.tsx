import { clearDate } from "@/helpers/date";
import { moneyFormat } from "@/helpers/money";
import { cn } from "@/lib/utils";
import { Text, TouchableOpacity, View } from "react-native";
import { InvestmentCardStatus } from "./status";
import { InvestmentCardProps } from "./types";

export function InvestmentCard(props: InvestmentCardProps) {
  const { data, onPress } = props;

  const verifyStatus = () => {
    const date = new Date().getTime();
    const finishedDate = clearDate(data.endDate).getTime();

    if (!data.status) {
      if (finishedDate < date) {
        return "FINISHED";
      }

      return "ACTIVE";
    }

    return data.status;
  };

  const status = verifyStatus();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View className={cn("flex flex-col p-3 bg-white rounded-lg gap-3")}>
        <View className="flex flex-row items-center justify-between">
          <Text className={cn("text-gray-500 text-xs")}>
            {`Investimento: ${data.id}`}
            {/* {`Investimento: ${data.number} | ${data.code}`} */}
          </Text>
          <InvestmentCardStatus status={status} />
        </View>
        <View>
          <Text className="text-2xl font-bold">{data.name}</Text>
          <Text className="text-xs text-yellow-500">
            {moneyFormat(data.income)} Kz
          </Text>
        </View>
        <View className="flex flex-row items-start justify-between">
          <Text
            className={cn("text-xs text-gray-500")}
          >{`Duração: ${data.duration} ${Number(data.duration) > 1 ? "meses" : "mês"}`}</Text>
          <Text className={cn("text-xs text-gray-500")}>
            {clearDate(data.startDate)?.toLocaleDateString()}
            {` - `}
            {clearDate(data.endDate)?.toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
