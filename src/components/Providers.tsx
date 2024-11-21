import { ReactNode } from "react";
import { UserPreferenceProvider } from "@/src/context/user-preference";

export const ApplicationProviders = ({ children }: { children: ReactNode }) => {
  return <UserPreferenceProvider>{children}</UserPreferenceProvider>;
};
