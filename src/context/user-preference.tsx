import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type DegreeType = "celsius" | "fahrenheit";

type UserPreferenceContextType = {
  degreeType: DegreeType;
  updateDegreeType: (newDegreeType: DegreeType) => void;
};

export const UserPreferenceContext = createContext<UserPreferenceContextType>({
  degreeType: "celsius",
  updateDegreeType: (newDegreeType: DegreeType) => {},
});

type UserPreferenceProviderProps = {
  children: ReactNode;
};

export const UserPreferenceProvider = ({
  children,
}: UserPreferenceProviderProps) => {
  const [degreeType, setDegreeType] = useState<DegreeType>("celsius");

  const updateDegreeType = (newDegreeType: DegreeType) => {
    if (newDegreeType !== "celsius" && newDegreeType !== "fahrenheit") {
      throw new Error("Invalid degree type");
    }

    setDegreeType(newDegreeType);
  };

  const contextValue = useMemo(
    () => ({ degreeType, updateDegreeType }),
    [degreeType],
  );

  return (
    <UserPreferenceContext.Provider value={contextValue}>
      {children}
    </UserPreferenceContext.Provider>
  );
};

export const useUserPreference = () => {
  const context = useContext(UserPreferenceContext);
  if (context === undefined) {
    throw new Error(
      "Please use useUserPreference inside UserPreferenceProvider.",
    );
  }
  return context;
};
