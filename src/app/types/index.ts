export type PokemonType =
  | "fire"
  | "water"
  | "ground"
  | "psychic"
  | "bug"
  | "poison"
  | "rock"
  | "normal"
  | "electric"
  | "fighting"
  | "grass"
  | "fairy"
  | "ghost";

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny?: string;
    back_shiny?: string;
  };
  types: {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  weight: number; // pounds
  height: number; // feet
}

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: ListItem[];
}

export interface ListItem {
  name: string;
  url: string;
}

export interface PokemonMove {
  name: string;
  power: number | null;
}

export interface PokemonProfile extends Pokemon {
  movesDetails: PokemonMove[];
}
