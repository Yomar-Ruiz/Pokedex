export type PokemonType = {
  name: string;
  url: string;
};

export type PokemonTypeSlot = {
  slot: number;
  type: PokemonType;
};

export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonTypeSlot[];
};

export type PokemonCardData = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type PokemonSearchData = {
  id: number;
  name: string;
};
