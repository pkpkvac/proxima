import { cva } from "class-variance-authority";
import { PokemonType } from "@/app/types";

export const cardClasses = cva(
  //   "border border-gray-300 flex flex-col justify-center items-center gap-2 h-40 w-40 rounded-md",
  "",
  {
    variants: {
      type: {
        fire: "bg-fire",
        water: "bg-water",
        ground: "bg-ground",
        psychic: "bg-psychic",
        bug: "bg-red",
        poison: "bg-poison",
        rock: "bg-rock",
        normal: "bg-normal",
        electric: "bg-electric",
        fighting: "bg-fighting",
        grass: "bg-grass",
        fairy: "bg-fairy",
        ghost: "bg-ghost",
      },
    },
  }
);

type CardClassesProps = {
  type: PokemonType;
};

export const cardClassesFunction = (props: CardClassesProps) => {
  return cardClasses(props);
};
