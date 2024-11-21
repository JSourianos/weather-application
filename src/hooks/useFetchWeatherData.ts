import { useEffect, useState } from "react";
import { YRAPIResponse } from "@/src/utils/types";

type ResponseStatus = "idle" | "loading" | "error";

export const useFetchWeatherData = (
  url: string,
): { data: YRAPIResponse | null; status: ResponseStatus } => {
  const [data, setData] = useState<YRAPIResponse | null>(null);
  const [status, setStatus] = useState<ResponseStatus>("idle");

  useEffect(() => {
    async function fetchData() {
      setStatus("loading");

      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setStatus("error");
      } finally {
        setStatus("idle");
      }
    }

    fetchData().catch((e) => setStatus("error"));
  }, [url]);

  return { data, status };
};
