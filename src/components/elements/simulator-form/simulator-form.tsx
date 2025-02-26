import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { DateInput } from "../../ui/date-input";
import { SimulatorFormProps } from "./types";
import { useSimulatorForm } from "./use-simulator-form";

export function SimulatorForm(props: SimulatorFormProps) {
  const { handleSimulate, formData, handleFormData } = useSimulatorForm(props);

  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-col gap-3 ">
        {/* Investimento */}
        <DateInput />
        {/* <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholder="Data ()"
          value={formData?.date?.toString()}
          onChangeText={(date) => handleFormData({ date })}
          returnKeyType="next"
        /> */}

        {/* Investimento */}
        <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholderTextColor={"#ffffff50"}
          placeholder="Valor disponível"
          value={formData?.balanceInitial?.toString()}
          onChangeText={(balanceInitial) => handleFormData({ balanceInitial })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Investimento */}
        <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholder="Investimento"
          value={formData?.investment?.toString()}
          onChangeText={(investment) => handleFormData({ investment })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Rendimento Mensal */}
        <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholder="Rendimento mensal"
          value={formData?.income?.toString()}
          onChangeText={(income) => handleFormData({ income })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Intervalo de tempo (mês) para iniciar a receber os rendimentos */}
        <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholder="Início do rendimento"
          value={formData?.intervalPeriodBeforeInvestment?.toString()}
          onChangeText={(intervalPeriodBeforeInvestment) =>
            handleFormData({ intervalPeriodBeforeInvestment })
          }
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Duração (em meses) */}
        <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholder="Duração (em meses)"
          value={formData?.duration?.toString()}
          onChangeText={(duration) => handleFormData({ duration })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Objectivo */}
        <TextInput
          className="text-white border border-white rounded px-2 py-1"
          placeholderClassName="text-white/50"
          placeholder="Objectivo"
          value={formData?.goal?.toString()}
          onChangeText={(goal) => handleFormData({ goal })}
          returnKeyType="done"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity activeOpacity={0.6} onPress={handleSimulate}>
        <View className="rounded-full w-full bg-white justify-center items-center py-2">
          <Text className="text-light-tint">Simular</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
