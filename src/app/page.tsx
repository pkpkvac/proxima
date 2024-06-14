import { getMove, getPokemon, listPokemon } from "./utils/fetchPokemon";
import ListA from "./components/ListA";
import ListB from "./components/ListB";
import { Pokemon, PokemonList, PokemonProfile } from "./types";
import Image from "next/image";

export default async function Home() {
  const list: PokemonList = await listPokemon(1000);
  const randomPokemon =
    list.results[Math.floor(Math.random() * list.results.length)];

  const pokemon: Pokemon = await getPokemon(randomPokemon.name);

  const movesDetails = await Promise.all(
    pokemon.moves.slice(0, 3).map(async (move) => {
      return await getMove(move.move.url);
    })
  );

  movesDetails.sort((a, b) => (a.power ?? 0) - (b.power ?? 0));

  const pokemonProfile: PokemonProfile = {
    ...pokemon,
    movesDetails,
  };

  return (
    <div className="bg-black min-h-screen max-h-full w-full flex flex-col gap-4 items-center justify-center p-20">
      <Image
        className="mb-16"
        alt="logo"
        src={"/pokemon-logo.png"}
        height={400}
        width={400}
      />
      <div className="flex gap-10">
        <ListA pokemon={pokemonProfile} />
        <ListB pokemon={pokemonProfile} />
      </div>
    </div>
  );
}
