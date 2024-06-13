import { Pokemon, PokemonList, PokemonMove } from "../types";

export const typedFetch = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch the Pokémon");
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    throw error;
  }
};

export async function listPokemon(limit: number): Promise<PokemonList> {
  try {
    return await typedFetch<PokemonList>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
    );
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
}

export async function getPokemon(item: string | number): Promise<Pokemon> {
  try {
    return await typedFetch<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${item}`
    );
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    throw error;
  }
}

export async function getMove(url: string): Promise<PokemonMove> {
  try {
    const move = await typedFetch<any>(url);
    return { name: move.name, power: move.power };
  } catch (error) {
    console.error("Error fetching move:", error);
    throw error;
  }
}
