import { Stack } from "expo-router";

import "../global.css";

import { ApplicationProviders } from "@/src/components/Providers";
import { verifyInstallation } from "nativewind";

export default function RootLayout() {
  verifyInstallation();

  return (
    <ApplicationProviders>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ApplicationProviders>
  );
}
