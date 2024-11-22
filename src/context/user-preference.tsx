import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DegreeType } from "@/src/utils/types";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "@/src/utils/async-storage-keys";

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
  // TODO: Fetch from async storage
  const [degreeType, setDegreeType] = useState<DegreeType>("celsius");

  const { setItem, getItem } = useAsyncStorage(ASYNC_STORAGE_KEYS.DEGREE_TYPE);

  const updateDegreeType = useCallback(
    async (newDegreeType: DegreeType) => {
      if (newDegreeType !== "celsius" && newDegreeType !== "fahrenheit") {
        throw new Error("Invalid degree type");
      }

      await setItem(newDegreeType);

      setDegreeType(newDegreeType);
    },
    [setItem],
  );

  useEffect(() => {
    const fetchStoredDegreeType = async () => {
      try {
        const storedDegreeType = await getItem();
        if (!storedDegreeType) {
          setDegreeType("celsius");
          return;
        }

        setDegreeType(storedDegreeType as DegreeType);
      } catch (error) {
        console.error("Failed to fetch stored degree type:", error);
        setDegreeType("celsius");
      }
    };

    fetchStoredDegreeType();
  }, [getItem]);

  const contextValue = useMemo(
    () => ({ degreeType, updateDegreeType }),
    [degreeType, updateDegreeType],
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
