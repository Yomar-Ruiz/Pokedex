"use client";

import { useState } from "react";
import PokemonCard from "./PokemonCard";
import type {
  PokemonCardData,
  PokemonSearchData,
} from "../types";

type PokemonListProps = {
  pokemonList: PokemonCardData[];
  pokemonSearchList: PokemonSearchData[];
  search: string;
};

export default function PokemonList({
  pokemonList,
  pokemonSearchList,
  search,
}: PokemonListProps) {
  const [searchValue, setSearchValue] = useState(search);

  const suggestions = searchValue.trim()
    ? pokemonSearchList.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    : [];

  const handleSearch = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = searchValue.trim().toLowerCase();

    if (value === "") {
      window.location.href = "/";
      return;
    }

    const foundPokemon = pokemonSearchList.find(
      (pokemon) =>
        pokemon.name.toLowerCase() === value
    );

    if (foundPokemon) {
      window.location.href = `/?search=${foundPokemon.name}`;
    }
  };

  const handleSuggestionClick = (
    pokemon: PokemonSearchData
  ) => {
    window.location.href = `/?search=${pokemon.name}`;
  };

  return (
    <>
      {/* BUSCADOR */}

      <div className="relative mx-auto mb-10 max-w-xl">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="🔎 Buscar Pokémon..."
            value={searchValue}
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
            className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          />
        </form>

        {/* SUGERENCIAS */}

        {searchValue.trim() &&
          suggestions.length > 0 &&
          !search && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
              {suggestions
                .slice(0, 5)
                .map((pokemon) => (
                  <button
                    key={pokemon.id}
                    type="button"
                    onClick={() =>
                      handleSuggestionClick(
                        pokemon
                      )
                    }
                    className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-gray-100"
                  >
                    <span className="font-semibold text-gray-400">
                      #
                      {pokemon.id
                        .toString()
                        .padStart(3, "0")}
                    </span>

                    <span className="capitalize font-medium text-gray-800">
                      {pokemon.name}
                    </span>
                  </button>
                ))}
            </div>
          )}
      </div>

      {/* RESULTADO DE LA BÚSQUEDA */}

      {search && pokemonList.length > 0 && (
        <>
          <p className="mb-6 text-center text-lg font-semibold text-gray-700">
            Resultado de búsqueda 🔎
          </p>

          <div className="mx-auto max-w-md">
            {pokemonList.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))}
          </div>
        </>
      )}



      {search && pokemonList.length === 0 && (
        <p className="text-center text-lg font-medium text-gray-500">
          😢 No encontramos ese Pokémon.
        </p>
      )}



      {!search && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </div>
      )}
    </>
  );
}
