import {
  Investment,
  INVESTMENT_STATUS_ENUM,
  InvestmentCard,
} from "@/components/investment-card";
import { StatusBarFilter } from "@/components/status-bar-filter";
import { ScrollView, Text, View } from "react-native";

const STATUS_FILTER = [
  {
    value: "ALL",
    title: "Todos",
  },
  { value: "ACTIVE", title: "Activos" },
  { value: "FINISHED", title: "Terminados" },
];

export default function InvestmentsScreen() {
  const data = {
    investments: 2,
    actives: 2,
    finished: 3,
  };

  const items: Investment[] = [
    {
      id: 1,
      code: "001",
      number: 1,
      name: "Xeque Mate",
      income: 100_000,
      incomeDate: new Date(),
      duration: "6 meses",
      startDate: new Date("202-01-26"),
      endDate: new Date("202-07-26"),
      status: INVESTMENT_STATUS_ENUM.ACTIVE,
    },
    {
      id: 1,
      code: "001",
      number: 1,
      name: "Xeque Mate",
      income: 100_000,
      incomeDate: new Date(),
      duration: "6 meses",
      startDate: new Date(),
      endDate: new Date(),
      status: INVESTMENT_STATUS_ENUM.FINISHED,
    },
  ];

  const handleFilter = (status: string) => {};

  return (
    <View className="flex-1">
      <View className="relative w-full bg-green-600 h-[160px] px-5">
        <Text className="text-white font-bold mt-14 text-2xl">
          Investimentos
        </Text>
        <View className="absolute bottom-0 inset-x-5 translate-y-1/2 flex justify-center items-center">
          <View className="bg-green-700 rounded-lg w-full p-4 h-[104px]">
            <Text className="text-white font-bold text-base">
              Seus investimentos
            </Text>
            <Text className="text-white font-bold text-2xl mt-4">
              {data.investments}
              <Text className="text-white font-bold text-xs">
                {" "}
                investimentos efectuados
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View className="pt-[68px]">
        <View className="flex flex-row gap-4 flex-1 px-5 mb-4">
          <View className="bg-light-tint rounded-md flex-1 w-full h-20 justify-center items-center">
            <Text className="text-xs text-white mb-1">Activos</Text>
            <Text className="text-2xl font-bold text-white">
              {data.actives}
            </Text>
          </View>
          <View className="bg-red-400 rounded-md flex-1 w-full h-20 justify-center items-center">
            <Text className="text-xs text-white mb-1">Terminados</Text>
            <Text className="text-2xl font-bold text-white">
              {data.finished}
            </Text>
          </View>
        </View>
        <StatusBarFilter items={STATUS_FILTER} />
      </View>

      <ScrollView>
        <View className="pt-4 px-5 flex flex-col gap-3">
          {items.map((item) => (
            <InvestmentCard data={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
