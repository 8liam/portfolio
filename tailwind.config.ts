import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        alternateprimary: "#0f0f0f",
        lighterbg: "#212121",
        accent: "#60A5FA",
      },
      animation: { "lavender-dream": "lavender-dream 5s ease infinite" },
      keyframes: {
        "lavender-dream": {
          "0%": {
            background:
              "linear-gradient(45deg, #000000, #000517, #000824, #010c36)",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 100%",
          },
          "50%": {
            background:
              "linear-gradient(45deg, #000000, #000517, #000824, #010c36)",
            backgroundSize: "200% 200%",
            backgroundPosition: "100% 0%",
          },
          "100%": {
            background:
              "linear-gradient(45deg, #000000, #000517, #000824, #010c36)",
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 100%",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
