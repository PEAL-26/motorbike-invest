import { colors } from "@/constants/colors";
import { ActivityIndicator, View } from "react-native";
import { DefaultModal } from "./default-modal";

interface Props {
  show?: boolean;
  onClose?(): void;
  incomeId?: number;
}

export function IncomeModal(props: Props) {
  const { incomeId, show, onClose } = props;
  console.log({ show, incomeId });

  const isLoading = true;

  return (
    <DefaultModal title="Rendimento" show={show} onClose={onClose}>
      {isLoading && (
        <View className="flex-1 flex flex-row items-center justify-center h-20">
          <ActivityIndicator size={20} animating color={colors.light.tint} />
        </View>
      )}
      {!isLoading && (
        <View className="flex-1 flex flex-row items-center justify-center h-20"></View>
      )}
    </DefaultModal>
  );
}
