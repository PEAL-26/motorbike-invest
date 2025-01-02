import {
  Income,
  INCOME_STATUS_ENUM,
  IncomeCard,
} from "@/components/income-card";
import { StatusBarFilter } from "@/components/status-bar-filter";
import { ScrollView, Text, View } from "react-native";

const INCOME_STATUS_FILTER = [
  {
    value: "ALL",
    title: "Todos",
  },
  { value: "PAID", title: "Pagos" },
  { value: "LATE", title: "Atrasados" },
  { value: "PENDING", title: "Pendentes" },
];

export default function IncomeScreen() {
  const data = {
    balanceFinal: 10_000_000,
    balanceCurrent: 1_000,
    investments: 2,
    income: 100_000,
    investmentsTotal: 12,
  };

  const items: Income[] = [
    {
      id: 1,
      code: "001",
      number: 1,
      income: 100_000,
      incomeDate: new Date(),
      paymentDate: new Date(),
      status: INCOME_STATUS_ENUM.PAID,
    },
    {
      id: 2,
      code: "002",
      number: 1,
      income: 100_000,
      incomeDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      paymentDate: null,
      status: INCOME_STATUS_ENUM.PENDING,
    },
    {
      id: 3,
      code: "003",
      number: 1,
      income: 100_000,
      incomeDate: new Date(new Date().setDate(new Date().getDate() - 2)),
      paymentDate: null,
      status: INCOME_STATUS_ENUM.PENDING,
    },
  ];

  const handleFilter = (status: string) => {};

  return (
    <View className="flex-1">
      <View className="relative w-full bg-green-600 h-[216px] px-5">
        <Text className="text-white font-bold mt-14 text-2xl">Rendimentos</Text>
        <View className="absolute bottom-0 inset-x-5 translate-y-1/2 flex justify-center items-center">
          <View className="bg-green-700 rounded-lg w-full p-4 h-[200px]">
            <Text className="text-white font-bold text-base">Resumo</Text>
            <Text className="text-white font-bold text-2xl mt-4">
              {data.balanceFinal}
              <Text className="text-white font-bold text-xs"> Saldo final</Text>
            </Text>

            <Text className="text-white font-bold text-base opacity-80">
              {data.balanceFinal}
              <Text className="text-white font-bold text-xs opacity-80">
                {" "}
                Saldo actual
              </Text>
            </Text>
            <Text className="text-white font-bold text-base opacity-80">
              {data.investments}
              <Text className="text-white font-bold text-xs opacity-80">
                {" "}
                Investimentos activos
              </Text>
            </Text>
            <Text className="text-white font-bold text-base opacity-80">
              {data.income}
              <Text className="text-white font-bold text-xs opacity-80">
                {" "}
                Rendimento mensal
              </Text>
            </Text>
            <Text className="text-white font-bold text-base opacity-80">
              {data.investmentsTotal}
              <Text className="text-white font-bold text-xs opacity-80">
                {" "}
                Investimentos total
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View className="pt-[116px]">
        <StatusBarFilter items={INCOME_STATUS_FILTER} filterButton />
      </View>

      <ScrollView>
        <View className="pt-4 px-5 flex flex-col gap-3">
          {items.map((item) => (
            <IncomeCard data={item}  />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
