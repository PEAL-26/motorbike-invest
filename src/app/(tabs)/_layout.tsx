import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { TabBar } from "@/components/ui/tab-bar";
import { colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
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
            <IconSymbol size={28} name="money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="investments"
        options={{
          title: "Investimentos",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="trending" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="simulator"
        options={{
          title: "Simulador",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="savings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
