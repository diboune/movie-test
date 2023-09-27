import type { Config } from "tailwindcss";
import taildix from "@taildix/colors";
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [taildix({ colors: ["gray", "red"] })],
} satisfies Config;
