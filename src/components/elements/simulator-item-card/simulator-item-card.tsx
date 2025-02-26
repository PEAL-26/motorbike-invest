import { moneyFormat } from "@/helpers/money";
import { cn } from "@/lib/utils";
import { Text, View } from "react-native";
import { SimulatorCardProps } from "./types";

export function SimulatorItemCard(props: SimulatorCardProps) {
  const { data, onPress } = props;

  return (
    <>
      {data.investments && (
        <View className="bg-green-600 p-2 rounded-lg ">
          <Text className="text-white text-xs">
            Investir: {data.investments}
          </Text>
          <Text className="text-white text-xs">
            Investimento total: {data.investmentsTotal}
          </Text>
        </View>
      )}
      <View className={cn("flex flex-col p-3 bg-white rounded-lg gap-3")}>
        <View className="flex flex-row items-center justify-between">
          <Text className={cn("text-gray-500 text-xs")}>
            {`Investimento: ${data.number}`}
          </Text>
          <Text className={cn("text-gray-500 text-xs")}>
            {`${data.date.toLocaleDateString()}`}
          </Text>
        </View>
        <View>
          <Text className={cn("text-black text-base font-bold")}>
            {`Rendimento: ${moneyFormat(data.income)}/mês`}
          </Text>
          <Text className={cn("text-gray-500 text-xs")}>
            {`Saldo: ${moneyFormat(data.balance)}`}
          </Text>
        </View>

        <View>
          <Text className={cn("text-gray-500 text-xs")}>
            {`Investimento Total: ${data.investmentsTotal}`}
          </Text>
        </View>
      </View>
    </>
  );
}
