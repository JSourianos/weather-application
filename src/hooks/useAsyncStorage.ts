import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

// TODO: Delete?
export const useAsyncStorage = (key: string) => {
  const [error, setError] = useState<string | null>(null);

  const storeData = async (value: string | object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
      setError("Failed to store data");
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
      setError("Failed to get data");
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      setError("Failed to remove data");
      console.error(e);
    }
  };

  return { storeData, getData, removeData, error };
};
