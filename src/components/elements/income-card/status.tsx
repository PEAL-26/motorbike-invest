import {} from "@expo/vector-icons";
import { Text, View } from "react-native";
interface Props {
  status: "PENDING" | "LATE" | "PAID";
  daysLate: number | null;
}

export function IncomeCardStatus(props: Props) {
  const { status, daysLate } = props;
  return (
    <View className="">
      {status === "PENDING" && (
        <Text className="text-xs text-gray-500">Pendente</Text>
      )}
      {status === "LATE" && (
        <Text className="text-xs text-white">Atrasado | {daysLate} dia(s)</Text>
      )}
      {status === "PAID" && (
        <Text className="text-xs text-light-tint">Pago</Text>
      )}
    </View>
  );
}
