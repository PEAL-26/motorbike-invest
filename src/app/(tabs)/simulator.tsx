import { simulate, SimulatorForm } from "@/components/elements/simulator-form";
import { SimulatorFormData } from "@/components/elements/simulator-form/types";
import {
  SimulatorItem,
  SimulatorItemCard,
} from "@/components/elements/simulator-item-card";
import { colors } from "@/constants/colors";
import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function SimulatorScreen() {
  const [items, setItems] = useState<SimulatorItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = (data: SimulatorFormData) => {
    setIsLoading(true);
    const result = simulate(data);
    setIsLoading(false);
    setItems(result);
  };

  return (
    <View className="flex-1">
      <View className="relative w-full bg-green-600 h-[160px] px-5">
        <Text className="text-white font-bold mt-14 text-2xl">Simulador</Text>
        <View className="absolute bottom-0 inset-x-5 translate-y-1/2 flex justify-center items-center z-10">
          <View className="bg-green-700 rounded-lg w-full p-4 ">
           
          </View>
        </View>
      </View>

      <View className="flex-1 ">
        {isLoading && (
          <View className="flex-1 flex flex-row items-center justify-center">
            <ActivityIndicator animating color={colors.light.tint} size={16} />
          </View>
        )}
        {!isLoading && (
          <ScrollView>
            <View className="pt-[96px] px-5 flex flex-col gap-3">
              {items.map((item) => (
                <SimulatorItemCard data={item} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
