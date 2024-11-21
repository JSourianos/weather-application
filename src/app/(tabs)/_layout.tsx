import { Tabs } from "expo-router";
import { Cloudy, UserCog } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Cloudy color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => <UserCog color={color} />,
        }}
      />
    </Tabs>
  );
}
