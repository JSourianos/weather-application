import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="weather/[name]" options={{ headerShown: false }} />
    </Stack>
  );
}
