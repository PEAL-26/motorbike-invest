import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  defaultItemValue?: string;
  items: { value: string; title: string }[];
  onFilter?(filter: Record<string, any>): void;
  filterButton?: boolean;
}

export function StatusBarFilter(props: Props) {
  const {
    items,
    defaultItemValue = "ALL",
    filterButton = false,
    onFilter,
  } = props;
  const [currentItemValue, setCurrentItemValue] = useState(
    () => defaultItemValue,
  );

  const handleFilter = (filter: Record<string, any>) => {
    setCurrentItemValue(filter["status"]);
    onFilter?.(filter);
  };

  return (
    <View className="flex flex-row items-center pr-5">
      <ScrollView>
        <View className="flex flex-row items-start gap-2 px-5">
          {items.map((item) => (
            <TouchableOpacity
              onPress={() => handleFilter({ status: item.value })}
            >
              <View className="flex flex-col items-start gap-1">
                <Text
                  className={cn(
                    "font-bold text-[#1E1E1E] text-xs",
                    currentItemValue === item.value && "text-light-tint",
                  )}
                >
                  {item.title}
                </Text>
                {currentItemValue === item.value && (
                  <View className="h-1 bg-light-tint w-full rounded-full" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {filterButton && (
        <TouchableOpacity onPress={() => {}}>
          <Text>Ftl</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
