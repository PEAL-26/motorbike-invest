import { InvestmentCard } from "@/components/elements/investment-card";
import { StatusBarFilter } from "@/components/elements/status-bar-filter";
import { InvestmentModal } from "@/components/madals";
import { INVESTMENT_STATUS_ENUM } from "@/constants/investment";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { getInvestmentSummary, listInvestments } from "@/services/investments";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const STATUS_FILTER = [
  {
    value: "ALL",
    title: "Todos",
  },
  { value: "ACTIVE", title: "Activos" },
  { value: "FINISHED", title: "Terminados" },
];

export default function InvestmentsScreen() {
  const [investmentModal, setInvestmentModal] = useState<{
    id?: number;
    show: boolean;
  }>({ show: false });

  const [status, setStatus] = useState<INVESTMENT_STATUS_ENUM | undefined>(
    undefined,
  );

  const { data: summary } = useQuery({
    queryFn: () => getInvestmentSummary(),
    queryKey: ["investment-summary"],
  });

  const { data } = useQueryPagination({
    fn: () => listInvestments({ status }),
    queryKey: ["investments"],
  });

  const handleFilter = (status: INVESTMENT_STATUS_ENUM) => {
    setStatus(status);
  };

  console.log(data);

  return (
    <>
      <View className="flex-1">
        <View className="relative w-full bg-green-600 h-[160px] px-5">
          <Text className="text-white font-bold mt-14 text-2xl">
            Investimentos
          </Text>
          <View className="absolute z-10 bottom-0 inset-x-5 translate-y-1/2 flex justify-center items-center">
            <View className="bg-green-700 rounded-lg w-full p-4 h-[104px]">
              <Text className="text-white font-bold text-base">
                Seus investimentos
              </Text>
              <Text className="text-white font-bold text-2xl mt-4">
                {summary?.investments || "S/N"}
                <Text className="text-white font-bold text-xs">
                  {" "}
                  investimentos efectuados
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View className="pt-[68px] flex flex-col">
          <View className="flex flex-row gap-4 px-5 mb-4">
            <View className="bg-light-tint rounded-md flex-1 w-full h-20 justify-center items-center">
              <Text className="text-xs text-white mb-1">Activos</Text>
              <Text className="text-2xl font-bold text-white">
                {summary?.actives || "S/N"}
              </Text>
            </View>
            <View className="bg-red-400 rounded-md flex-1 w-full h-20 justify-center items-center">
              <Text className="text-xs text-white mb-1">Terminados</Text>
              <Text className="text-2xl font-bold text-white">
                {summary?.finished || "S/N"}
              </Text>
            </View>
          </View>
          <StatusBarFilter items={STATUS_FILTER} onChangeValue={handleFilter} />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="pt-4 px-5 pb-[88px] flex flex-col gap-3">
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <InvestmentCard
                  key={item.id}
                  data={item}
                  onPress={() =>
                    setInvestmentModal({ id: item.id, show: true })
                  }
                />
              )}
              ItemSeparatorComponent={() => <View className="h-3" />}
            />
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity
        className="h-14 w-14 flex items-center justify-center bg-light-tint rounded-full absolute right-5 bottom-[88px]"
        onPress={() => setInvestmentModal({ show: true })}
      >
        <PlusIcon size={16} color={"#fff"} />
      </TouchableOpacity>

      {investmentModal?.show && (
        <InvestmentModal onClose={() => setInvestmentModal({ show: false })} />
      )}
    </>
  );
}
