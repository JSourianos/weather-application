import { FlatList, SafeAreaView, View } from "react-native";
import { useState } from "react";
import { WeatherItem } from "@/src/components/WeatherItem";
import { DEFAULT_URLS } from "@/src/utils/api";
import { ScreenWrapper } from "@/src/components/ScreenWrapper";
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
 *  8.
// TODO: Wind from direction also.
 *
 *
 * */

export default function Homepage() {
  // TODO: Extract to custom hook, or to context? Would allow us to not fetch twice.
  const [urls, setUrls] = useState(DEFAULT_URLS);

  return (
    <ScreenWrapper>
      <FlatList
        style={{ flex: 1 }}
        data={urls}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => <WeatherItem {...item} />}
      />
    </ScreenWrapper>
  );
}
