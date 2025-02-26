import {} from "@expo/vector-icons";
import { Text, View } from "react-native";
interface Props {
  incomeDate: Date;
  status: "PENDING" | "LATE" | "PAID";
}

export function IncomeCardStatus(props: Props) {
  const { status, incomeDate } = props;
  // Verificar quantos dias está atrasado
  const daysLate = 1;
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
