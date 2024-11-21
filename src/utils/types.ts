// TODO: Update to get more data?
export type YRAPIResponse = {
  properties: {
    timeseries: {
      data: {
        instant: {
          details: {
            air_pressure_at_sea_level: number;
            air_temperature: number;
            cloud_area_fraction: number;
            relative_humidity: number;
            wind_from_direction: number;
            wind_speed: number;
          };
        };
      };
      time: string;
    }[];
  };
};

export type YRTimeseries = YRAPIResponse["properties"]["timeseries"][0];
