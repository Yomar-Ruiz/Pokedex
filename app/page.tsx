import type { Pokemon } from "./types";
import PokemonList from "./components/PokemonList";

export default async function Home() {
  const pokemonList = await Promise.all(
    Array.from({ length: 151 }, async (_, index) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${index + 1}`
      );

      const pokemon: Pokemon = await response.json();

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
        types: pokemon.types.map((typeInfo) => typeInfo.type.name),
      };
    })
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <h1 className="mb-2 text-center text-4xl font-extrabold text-red-600 sm:text-5xl">
        Pokédex de Kanto
      </h1>

      <p className="mb-8 text-center text-gray-600">
        Explora los 151 Pokémon originales de Kanto
      </p>

      <PokemonList pokemonList={pokemonList} />
    </main>
  );
}