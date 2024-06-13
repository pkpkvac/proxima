import { getMove, getPokemon, listPokemon } from "./utils/fetchPokemon";
import ListA from "./components/ListA";
import ListB from "./components/ListB";
import { Pokemon, PokemonList, PokemonProfile } from "./types";

export default async function Home() {
  const list: PokemonList = await listPokemon(100);
  const randomPokemon =
    list.results[Math.floor(Math.random() * list.results.length)];

  const pokemon: Pokemon = await getPokemon(randomPokemon.name);

  const movesDetails = await Promise.all(
    pokemon.moves.slice(0, 3).map(async (move) => {
      return await getMove(move.move.url);
    })
  );

  //   sort moves by power
  movesDetails.sort((a, b) => (a.power ?? 0) - (b.power ?? 0));

  const pokemonProfile: PokemonProfile = {
    ...pokemon,
    movesDetails,
  };

  // cries: {
  // latest: ...
  // legacy: ...
  // }

  return (
    <div className="min-h-screen max-h-full w-full flex flex-col gap-4 items-center justify-center bg-[#FCFCFC] p-20">
      <h1 className="text-4xl font-bold text-center">
        ProximaHQ Coding Challenge
      </h1>
      <p>Check out the instructions in the README.md</p>
      <div className="flex gap-4">
        <ListA pokemon={pokemonProfile} />
        <ListB pokemon={pokemonProfile} />
      </div>
    </div>
  );
}
