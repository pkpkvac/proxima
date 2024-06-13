import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(90deg, #D4AF37 0%, #F3D27D 50%, #D4AF37 100%)",
      },
      colors: {
        // types
        fire: "#F08030",
        water: "#6890F0",
        ground: "#E0C068",
        psychic: "#F85888",
        bug: "#A8B820",
        poison: "#A040A0",
        rock: "#B8A038",
        normal: "#A8A878",
        electric: "#F8D030",
        fighting: "#C03028",
        grass: "#78C850",
        fairy: "#EE99AC",
        ghost: "#705898",

        // card
        card: "#F3D27D",
        gold: "#F3D27D",
        darkGold: "#D4AF37",
      },
    },
  },
  plugins: [],
};
export default config;
