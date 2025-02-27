import { IncomeCard } from "@/components/elements/income-card";
import { StatusBarFilter } from "@/components/elements/status-bar-filter";
import { IncomeModal } from "@/components/modals";
import { Loading } from "@/components/ui/loading";
import { useLoadingScreen } from "@/hooks/use-loading-screen";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { getIncomeSummary, listIncomes } from "@/services/incomes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

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
  const { isLoadingScreen } = useLoadingScreen();
  const [incomeModal, setIncomeModal] = useState<{
    id?: number;
    show: boolean;
  }>({ show: false });

  const handleFilter = (status: string) => {};

  const { data: summary } = useQuery({
    queryFn: () => getIncomeSummary(),
    queryKey: ["income-summary"],
  });

  const { data } = useQueryPagination({
    fn: () => listIncomes({ size: 50 }),
    queryKey: ["incomes"],
  });

  return (
    <>
      <View className="flex-1">
        {isLoadingScreen && (
          <>
            <Loading />
          </>
        )}
        {!isLoadingScreen && (
          <>
            <View className="relative w-full bg-green-600 h-[216px] px-5">
              <Text className="text-white font-bold mt-14 text-2xl">
                Rendimentos
              </Text>
              <View className="absolute bottom-0 inset-x-5 translate-y-1/2 flex justify-center items-center">
                <View className="bg-green-700 rounded-lg w-full p-4 h-[200px]">
                  <Text className="text-white font-bold text-base">Resumo</Text>
                  <Text className="text-white font-bold text-2xl mt-4">
                    {summary?.balanceFinal || "S/N"}
                    <Text className="text-white font-bold text-xs">
                      {" "}
                      Saldo final
                    </Text>
                  </Text>

                  <Text className="text-white font-bold text-base opacity-80">
                    {summary?.balanceFinal || "S/N"}
                    <Text className="text-white font-bold text-xs opacity-80">
                      {" "}
                      Saldo actual
                    </Text>
                  </Text>
                  <Text className="text-white font-bold text-base opacity-80">
                    {summary?.investments || "S/N"}
                    <Text className="text-white font-bold text-xs opacity-80">
                      {" "}
                      Investimentos activos
                    </Text>
                  </Text>
                  <Text className="text-white font-bold text-base opacity-80">
                    {summary?.income || "S/N"}
                    <Text className="text-white font-bold text-xs opacity-80">
                      {" "}
                      Rendimento mensal
                    </Text>
                  </Text>
                  <Text className="text-white font-bold text-base opacity-80">
                    {summary?.investmentsTotal || "S/N"}
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

            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-1 pt-4 pb-[88px] px-5">
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({ item }) => (
                    <IncomeCard
                      key={item.id}
                      data={item}
                      onPress={() =>
                        setIncomeModal({ id: item.id, show: true })
                      }
                    />
                  )}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
      {incomeModal.show && (
        <IncomeModal
          show={incomeModal.show}
          incomeId={incomeModal?.id}
          onClose={() => setIncomeModal({ show: false })}
        />
      )}
    </>
  );
}
