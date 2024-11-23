import { DegreeType } from "@/src/lib/utils/types";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const resolveDegreeSelectionText = (
  celsius: number,
  selectedDegree: DegreeType,
) => {
  if (selectedDegree === "celsius") {
    return `${celsius}°C`;
  }

  const fahrenheit = celsius * 1.8 + 32;
  return `${fahrenheit}°F`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
