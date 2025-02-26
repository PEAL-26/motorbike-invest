import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { Text } from "react-native";

export interface TabBarProps extends BottomTabBarProps {}

export function TabBar(props: TabBarProps) {
  const { state, descriptors, navigation } = props;

  return (
    <View
      className={cn(
        "absolute inset-x-0 flex-row items-center justify-between border-b border-gray-300 bg-white px-8  transition-all bottom-0 rounded-t-[40px] h-[76px]",
      )}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        if (!options?.title) return null;

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.6}
            onPressIn={(ev) => {
              if (process.env.EXPO_OS === "ios") {
                // Add a soft haptic feedback when pressing down on the tabs.
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              // props.onPressIn?.(ev);
            }}
            className="flex flex-col gap-2 items-center justify-center"
          >
            {options?.tabBarIcon?.({
              color: isFocused ? colors.light.tint : colors.light.icon,
              focused: true,
              size: 16,
            })}
            <Text
              className={cn(
                "text-xs text-light-icon",
                isFocused && "text-light-tint",
              )}
            >
              {typeof label === "string" ? label : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
