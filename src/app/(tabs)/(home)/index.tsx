import { FlatList, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { WeatherItem } from "@/src/components/WeatherItem";
import { DEFAULT_URLS } from "@/src/utils/api";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { Navigation } from "lucide-react-native";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
/*
 *
 * TODO:
 *  1. Base Wrapper around Item, Loading and Error.
 *  2. Type out the API Response
 *  3. Add AsyncStorage for User Preferences
 *  4. Check Documentation if we can fetch multiple at once.
 *  5. Weather Specific Page
 *  6. Weather wind direction etc, on the window specific page.
 *  7. Add a refresh button.
 *  8. Wind from direction, and transform the icon.
 *  9. On specific screen, add forecast also

 * */

export default function Homepage() {
  // TODO: Extract to custom hook, or to context? Would allow us to not fetch twice.
  const [urls, setUrls] = useState(DEFAULT_URLS);

  const { getCurrentLocation, error: userLocationError } = useUserLocation();
  const { setItem, getItem } = useAsyncStorage("my-location");

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

      setUrls((prev) => [
        ...prev,
        {
          name: "My Location",
          url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
        },
      ]);
    });
  }

  async function handleGetLocation() {
    const location = await getItem();

    if (location) {
      console.log("location", location);

      const { latitude, longitude } = JSON.parse(location);
      setUrls((prev) => [
        ...prev,
        {
          name: "My Location",
          url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
        },
      ]);
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <ScreenWrapper>
      <Pressable
        className="bg-slate-200 flex flex-row items-center gap-4 p-4 self-start rounded-2xl my-2 ml-auto"
        onPress={handleAddLocation}
      >
        <Navigation />
        <Text className="text-blue-500 font-medium">Add my location!</Text>
      </Pressable>
      <FlatList
        style={{ flex: 1 }}
        data={urls}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <WeatherItem {...item} />}
      />
    </ScreenWrapper>
  );
}
