import { isValidDate } from "@/helpers/date";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SimulatorFormProps } from "./types";
import { useSimulatorForm } from "./use-simulator-form";

export function SimulatorForm(props: SimulatorFormProps) {
  const { handleSimulate, formData, handleFormData } = useSimulatorForm(props);

  const [errorDate, setErrorDate] = useState(false);

  return (
    <View className="flex flex-col gap-4 px-5 pb-5">
      <View className="flex flex-col gap-3 ">
        {/* Investimento */}
        <View className="flex-1">
          <Text className="font-bold">Data de início</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            placeholder={new Date().toLocaleDateString()}
            className="border rounded px-2 text-xs border-gray-200 py-1"
            maxLength={11}
            value={formData?.date}
            onChangeText={(date) => handleFormData({ date })}
            onBlur={() => {
              setErrorDate(false);
              if (!isValidDate(formData?.date || "")) {
                setErrorDate(true);
              }
            }}
          />
          {errorDate && (
            <Text className="text-xs text-red-500">Formato: dd/mm/yyyy</Text>
          )}
        </View>

        {/* Investimento */}
        <Text className="font-bold">Valor Inicial</Text>
        <TextInput
          className="border rounded px-2 text-xs border-gray-200 py-1"
          placeholderClassName="text-white/50"
          placeholder="Valor disponível"
          value={formData?.balanceInitial?.toString()}
          onChangeText={(balanceInitial) => handleFormData({ balanceInitial })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Investimento */}
        <Text className="font-bold">Valor do Investimento</Text>
        <TextInput
          className="border rounded px-2 text-xs border-gray-200 py-1"
          placeholderClassName="text-white/50"
          placeholder="Investimento"
          value={formData?.investment?.toString()}
          onChangeText={(investment) => handleFormData({ investment })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Rendimento Mensal */}
        <Text className="font-bold">Rendimento mensal</Text>
        <TextInput
          className="border rounded px-2 text-xs border-gray-200 py-1"
          placeholderClassName="text-white/50"
          placeholder="Rendimento mensal"
          value={formData?.income?.toString()}
          onChangeText={(income) => handleFormData({ income })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Intervalo de tempo (mês) para iniciar a receber os rendimentos */}
        <Text className="font-bold">Intervalo até o primeiro rendimento</Text>
        <TextInput
          className="border rounded px-2 text-xs border-gray-200 py-1"
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
        <Text className="font-bold">Duração</Text>
        <TextInput
          className="border rounded px-2 text-xs border-gray-200 py-1"
          placeholderClassName="text-white/50"
          placeholder="Duração (em meses)"
          value={formData?.duration?.toString()}
          onChangeText={(duration) => handleFormData({ duration })}
          returnKeyType="next"
          keyboardType="numeric"
        />

        {/* Objectivo */}
        <Text className="font-bold">Objectivo</Text>
        <TextInput
          className="border rounded px-2 text-xs border-gray-200 py-1"
          placeholderClassName="text-white/50"
          placeholder="Objectivo"
          value={formData?.goal?.toString()}
          onChangeText={(goal) => handleFormData({ goal })}
          returnKeyType="done"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity activeOpacity={0.6} onPress={handleSimulate}>
        <View className="rounded-md w-full bg-light-tint justify-center items-center py-2">
          <Text className="text-white">Simular</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
