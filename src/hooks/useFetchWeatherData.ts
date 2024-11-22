import { useEffect, useState } from "react";
import { YRAPIResponse } from "@/src/utils/types";

type ResponseStatus = "idle" | "loading" | "error";

export const useFetchWeatherData = (
  url: string,
): { data: YRAPIResponse | undefined; status: ResponseStatus } => {
  const [data, setData] = useState<YRAPIResponse | undefined>(undefined);
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
