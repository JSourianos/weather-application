import { ReactNode } from "react";
import { UserPreferenceContext } from "@/src/context/user-preference";

export const MOCKED_USER_PREFERENCE_VALUE = {
  degreeType: "celsius",
  updateDegreeType: jest.fn(),
} as {
  degreeType: "celsius" | "fahrenheit";
  updateDegreeType: (newDegreeType: "celsius" | "fahrenheit") => void;
};

export const MockedUserPreferenceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <UserPreferenceContext.Provider value={MOCKED_USER_PREFERENCE_VALUE}>
      {children}
    </UserPreferenceContext.Provider>
  );
};
