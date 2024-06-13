// src/app/components/ListB.tsx
import React from "react";
import Image from "next/image";
import { Pokemon } from "../../types";

type ListBProps = {
  pokemon: Pokemon;
};

const ListB: React.FC<ListBProps> = ({ pokemon }) => {
  const primaryType = pokemon.types[0].type.name;

  console.log(primaryType);

  return (
    <div
      className={`border border-gray-300 bg-fighting flex flex-col justify-center items-center gap-2 h-40 w-40 rounded-md`}
    >
      <h3 className="text-center text-xl font-bold capitalize">
        {pokemon.name}
      </h3>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={96}
        height={96}
      />
    </div>
  );
};

export default ListB;
