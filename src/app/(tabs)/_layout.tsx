import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { TabBar } from "@/components/ui/tab-bar";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 relative">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
        tabBar={({ ...rest }) => <TabBar {...rest} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Rendimentos",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28}
                name={"attach-money" as any}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="investments"
          options={{
            title: "Investimentos",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name={"trending-up" as any} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="simulator"
          options={{
            title: "Simulador",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name={"savings" as any} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
