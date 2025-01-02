import { cn } from "@/lib/utils";
import {} from "@expo/vector-icons";
import { Text, View } from "react-native";

interface Props {
  status: "ACTIVE" | "FINISHED";
}

export function InvestmentCardStatus(props: Props) {
  const { status } = props;

  return (
    <View
      className={cn(
        "px-2 rounded-full",
        status === "ACTIVE" && "border border-light-tint",
        status === "FINISHED" && "border border-red-400",
      )}
    >
      <Text
        className={cn(
          "text-xs text-light-tint",
          status === "ACTIVE" && "text-light-tint",
          status === "FINISHED" && " text-red-400",
        )}
      >
        {status === "ACTIVE" ? "Activo" : "Terminado"}
      </Text>
    </View>
  );
}
