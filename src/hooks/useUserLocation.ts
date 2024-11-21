import { useState } from "react";

import * as Location from "expo-location";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type GetLocationType = Promise<{
  latitude: number | null;
  longitude: number | null;
}>;

export const useUserLocation = (): {
  getCurrentLocation: () => GetLocationType;
  error: string | null;
} => {
  const [error, setErrorMsg] = useState<string | null>(null);
  const { getItem } = useAsyncStorage("my-location");

  async function getCurrentLocation(): GetLocationType {
    const existingLocation = await getItem((error) => {
      if (error) {
        setErrorMsg("Failed to get saved location");
      }
    });

    if (existingLocation) {
      console.log("existingLocation", existingLocation);
      return JSON.parse(existingLocation);
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return {
        latitude: null,
        longitude: null,
      };
    }

    const { coords } = await Location.getCurrentPositionAsync({});

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  }

  return { getCurrentLocation, error };
};
