import { Tabs } from "expo-router";
import { CloudyIcon, UserCogIcon } from "@/src/lib/icons";
import { cn } from "@/src/lib/utils/utils";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) => (
            <CloudyIcon
              className={cn(focused ? "text-blue-600" : "text-blue-400")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarLabelStyle: {
            color: "black",
          },
          tabBarIcon: ({ focused }) => (
            <UserCogIcon
              className={cn(focused ? "text-blue-600" : "text-blue-400")}
            />
          ),
        }}
      />
    </Tabs>
  );
}
