import { getMove, getPokemon, listPokemon } from './utils/fetchPokemon';
import ListA from './components/ListA';
import ListB from './components/ListB';
import { PokemonList, PokemonProfile } from './types';
import Image from 'next/image';

export default async function Home() {
	const list: PokemonList = await listPokemon(1000);
	const randomPokemonNames = list.results
		.sort(() => 0.5 - Math.random())
		.slice(0, 40)
		.map((p) => p.name);

	const randomPokemonProfiles: PokemonProfile[] = await Promise.all(
		randomPokemonNames.map(async (name) => {
			const pokemon = await getPokemon(name);
			const movesDetails = await Promise.all(
				pokemon.moves
					.slice(0, 3)
					.map(async (move) => await getMove(move.move.url)),
			);
			movesDetails.sort((a, b) => (a.power ?? 0) - (b.power ?? 0));
			return { ...pokemon, movesDetails };
		}),
	);

	const randomPokemon =
		randomPokemonProfiles[
			Math.floor(Math.random() * randomPokemonProfiles.length)
		];

	return (
		<div className="bg-black min-h-screen max-h-full w-full flex flex-col gap-4 items-center justify-center p-20">
			<Image
				className="mb-16"
				alt="logo"
				src={'/pokemon-logo.png'}
				height={400}
				width={400}
			/>
			<div className="flex flex-col ">
				<ListA pokemonList={randomPokemonProfiles} />
				<ListB pokemon={randomPokemon} />
			</div>
		</div>
	);
}
