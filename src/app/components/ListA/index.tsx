"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PokemonProfile } from "../../types";

type ListAProps = {
  pokemon: PokemonProfile;
};

const ListA: React.FC<ListAProps> = ({ pokemon }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const primaryType = pokemon.types[0].type.name;

  const toggleShiny = () => setIsShiny(!isShiny);
  const toggleFrontBack = () => setIsFront(!isFront);

  const sprite = isShiny
    ? isFront
      ? pokemon.sprites.front_shiny
      : pokemon.sprites.back_shiny
    : isFront
    ? pokemon.sprites.front_default
    : pokemon.sprites.back_default;

  return (
    <div>
      <div className="border-8 rounded-md border-card h-[730px] w-[521px] shadow-lg mx-auto py-5">
        <div className="px-[40px]">
          <div className="flex justify-between items-center px-10">
            <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
            <div className="flex items-center">
              <span className="text-lg font-bold text-red-500">100 HP</span>
              <span className="ml-2 text-sm font-bold">{primaryType}</span>
            </div>
          </div>
          <div
            className="border-4 flex my-2"
            style={{
              justifyContent: "center",
              borderImageSource:
                "linear-gradient(90deg, #D4AF37 0%, #F3D27D 30%, #D4AF37 60%, #F3D27D 90%, #D4AF37 100%)",
              borderImageSlice: 1,
            }}
          >
            {sprite && (
              <Image
                src={sprite}
                alt={pokemon.name}
                width={250}
                height={300}
                className="rounded-lg"
              />
            )}
          </div>
          <div className=" text-sm flex justify-between capitalize px-5 bg-gold-gradient mx-5 py-1">
            <span>{`${primaryType} Pokemon. Height: ${pokemon.height} inches, Weight: ${pokemon.weight} lbs.`}</span>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-bold">Moves</h4>
            <ul>
              {pokemon.movesDetails.map((move, index) => (
                <li key={index}>
                  {move.name} (Power: {move.power ?? "N/A"})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={toggleFrontBack}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          {isFront ? "Show Back" : "Show Front"}
        </button>
        <button
          onClick={toggleShiny}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          {isShiny ? "Show Normal" : "Show Shiny"}
        </button>
      </div>
    </div>
  );
};

export default ListA;
