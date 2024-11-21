import { FlatList, Pressable, Text, View } from "react-native";
import { useEffect } from "react";
import { WeatherItem } from "@/src/components/WeatherItem";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
import { Navigation } from "lucide-react-native";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useStoredUrls } from "@/src/context/stored-urls";
/*
 *
 * TODO:
 *  1. Base Wrapper around Item, Loading and Error.
 *  4. Check Documentation if we can fetch multiple at once.
 *  6. Weather wind direction etc, on the window specific page.
 *  7. Add a refresh button.
 *  8. Wind from direction, and transform the icon.
 *  9. On specific screen, add forecast also
 *  10. Add 5-10 location that are searchable, in an action sheet
 * */

export default function Homepage() {
  // This should also be context, as we can share it to the weather id page. Or just add ids?
  const { storedUrls, addStoredUrl } = useStoredUrls();

  const { getCurrentLocation, error: userLocationError } = useUserLocation();
  const { setItem, getItem } = useAsyncStorage("my-location");

  // TODO: We could extract this into its own button and use a callback to set it to state
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
      });
    });
  }

  async function handleGetLocation() {
    const location = await getItem();

    const alreadyInUrls = storedUrls.some((url) => url.name === "My Location");
    if (alreadyInUrls) {
      return;
    }

    // TODO: Handle error
    if (location) {
      const { latitude, longitude } = JSON.parse(location);

      addStoredUrl({
        id: Math.floor(Math.random() * 1000).toString(),
        name: "My Location",
        url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
      });
    }
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  const containsMyLocation = storedUrls.some(
    (url) => url.name === "My Location",
  );

  return (
    <ScreenWrapper>
      {userLocationError && (
        <Text className="text-red-500">{userLocationError}</Text>
      )}

      {!containsMyLocation && (
        <Pressable
          className="bg-slate-200 flex flex-row items-center gap-4 p-4 self-start rounded-2xl my-2 ml-auto"
          onPress={handleAddLocation}
        >
          <Navigation />
          <Text className="text-blue-500 font-medium">Add my location!</Text>
        </Pressable>
      )}

      <FlatList
        style={{ flex: 1 }}
        data={storedUrls}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <WeatherItem {...item} />}
      />
    </ScreenWrapper>
  );
}
