// TODO: Test error state
import { useStoredUrls } from "@/src/context/stored-urls";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { Pressable, Text } from "react-native";
import { Navigation } from "lucide-react-native";
import { ASYNC_STORAGE_KEYS } from "@/src/lib/utils/async-storage-keys";
import { YR_SUNRISE_API_URL } from "../lib/utils/api";

export const AddUserLocation = () => {
  const { addStoredUrl } = useStoredUrls();
  const { setItem } = useAsyncStorage(ASYNC_STORAGE_KEYS.MY_LOCATION);
  const { getCurrentLocation, error: userLocationError } = useUserLocation();

  async function handleAddLocation() {
    const location = await getCurrentLocation();

    if (!location) {
      return;
    }

    const { latitude, longitude } = location;
    const stringifiedLocation = JSON.stringify({ latitude, longitude });

    await setItem(stringifiedLocation, (error) => {
      if (error) {
        console.error(error);
      }

      addStoredUrl({
        id: Math.floor(Math.random() * 1000).toString(),
        name: "My Location",
        url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
        sunriseUrl: `${YR_SUNRISE_API_URL}?lat=${latitude}&lon=${longitude}`,
      });
    });
  }

  if (userLocationError) {
    return <Text className="text-red-500">{userLocationError}</Text>;
  }

  return (
    <Pressable
      className="bg-slate-200 flex flex-row items-center gap-4 p-4 self-start rounded-2xl my-2 ml-auto"
      onPress={handleAddLocation}
    >
      <Navigation />
      <Text className="text-blue-500 font-medium">Add my location!</Text>
    </Pressable>
  );
};
