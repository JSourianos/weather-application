import { SingleWeatherScreen } from "@/src/screens/(home)/single-weather-screen";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/src/context/stored-urls");
jest.mock("@/src/hooks/useFetchWeatherData");
jest.mock("@/src/context/user-preference");

// TODO: Create integration tests for SingleWeatherScreen
// TODO: Properly mock async storage.
describe("SingleWeatherScreen", () => {});
