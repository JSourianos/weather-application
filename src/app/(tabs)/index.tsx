import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import { WeatherItem } from "@/src/components/WeatherItem";
import { DEFAULT_URLS } from "@/src/utils/api";
/*
 *
 * TODO:
 *  1. Base Wrapper around Item, Loading and Error.
 *  2. Type out the API Response
 *  3. Add AsyncStorage for User Preferences
 *  4. Check Documentation if we can fetch multiple at once.
 *
 * */

export default function Homepage() {
  const [urls, setUrls] = useState(DEFAULT_URLS);

  return (
    <FlatList
      data={urls}
      renderItem={({ item }) => <WeatherItem url={item} />}
    />
  );
}
