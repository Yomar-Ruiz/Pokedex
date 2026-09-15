"use client";

import { useState } from "react";
import PokemonCard from "./PokemonCard";
import type { PokemonCardData } from "../types";

type PokemonListProps = {
  pokemonList: PokemonCardData[];
};

export default function PokemonList({
  pokemonList,
}: PokemonListProps) {
  const [search, setSearch] = useState("");

  const filteredPokemon = pokemonList.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mx-auto mb-10 max-w-xl">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            types={pokemon.types.map(
              (typeInfo) => typeInfo.type.name
            )}
          />
        ))}
      </div>
    </>
  );
}