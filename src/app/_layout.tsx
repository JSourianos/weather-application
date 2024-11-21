import { Stack } from "expo-router";
import { ApplicationProviders } from "@/src/components/Providers";

import "../global.css";

export default function RootLayout() {
  return (
    <ApplicationProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApplicationProviders>
  );
}
