import { resolveDegreeSelectionText } from "@/src/lib/utils/utils";

describe("resolveDegreeSelectionText", () => {
  it("should return the temperature in celsius", () => {
    const celsius = 20;
    const selectedDegree = "celsius";
    const result = resolveDegreeSelectionText(celsius, selectedDegree);
    expect(result).toBe("20°C");
  });

  it("should return the temperature in fahrenheit", () => {
    const celsius = 20;
    const selectedDegree = "fahrenheit";
    const result = resolveDegreeSelectionText(celsius, selectedDegree);
    expect(result).toBe("68°F");
  });
});
