import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex justify-center items-center flex-1">
      <ActivityIndicator animating />
    </View>
  );
}
