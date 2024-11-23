import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";

// This function is used to add the `className` prop to the Lucide icons.
export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
