import {
  ResponseStatus,
  YRAPIResponse,
  YRSunriseResponse,
} from "@/src/lib/utils/types";
import { useEffect, useState } from "react";

export const useFetchSunriseSunsetData = (
  url: string,
): { data: YRSunriseResponse | undefined; status: ResponseStatus } => {
  console.log("url", url);
  const [data, setData] = useState<YRSunriseResponse | undefined>(undefined);
  const [status, setStatus] = useState<ResponseStatus>("idle");

  useEffect(() => {
    async function fetchData() {
      setStatus("loading");

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(JSON.stringify(json, null, 2));
        setData(json);
      } catch (e) {
        console.error(e);
        setStatus("error");
      } finally {
        setStatus("idle");
      }
    }

    fetchData();
  }, [url]);

  return { data, status };
};
