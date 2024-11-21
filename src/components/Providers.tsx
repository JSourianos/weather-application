import { ReactNode } from "react";
import { UserPreferenceProvider } from "@/src/context/user-preference";
import { StoredUrlsProvider } from "@/src/context/stored-urls";

export const ApplicationProviders = ({ children }: { children: ReactNode }) => {
  return (
    <UserPreferenceProvider>
      <StoredUrlsProvider>{children}</StoredUrlsProvider>
    </UserPreferenceProvider>
  );
};
