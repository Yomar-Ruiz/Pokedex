import type {
  Pokemon,
  PokemonSearchData,
  PokemonCardData,
} from "./types";

import PokemonList from "./components/PokemonList";

type HomeProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomeProps) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const search = params.search || "";

  const pokemonPerPage = 30;


  const searchResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  const searchData = await searchResponse.json();

  const pokemonSearchList: PokemonSearchData[] =
    searchData.results.map(
      (pokemon: { name: string; url: string }) => {
        const id = Number(
          pokemon.url.split("/").filter(Boolean).pop()
        );

        return {
          id,
          name: pokemon.name,
        };
      }
    );


  let pokemonList: PokemonCardData[] = [];

  if (search) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
    );

    if (response.ok) {
      const pokemon: Pokemon =
        await response.json();

      pokemonList = [
        {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          types: pokemon.types.map(
            (typeInfo) => typeInfo.type.name
          ),
        },
      ];
    }
  }


  else {
    const offset =
      (currentPage - 1) * pokemonPerPage;

    const results = await Promise.all(
      Array.from(
        { length: pokemonPerPage },
        async (_, index) => {
          const pokemonId =
            offset + index + 1;

          if (pokemonId > 151) {
            return null;
          }

          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
          );

          const pokemon: Pokemon =
            await response.json();

          return {
            id: pokemon.id,
            name: pokemon.name,
            image:
              pokemon.sprites.front_default,
            types: pokemon.types.map(
              (typeInfo) =>
                typeInfo.type.name
            ),
          };
        }
      )
    );

    pokemonList = results.filter(
      (pokemon): pokemon is PokemonCardData =>
        pokemon !== null
    );
  }


  const totalPages = Math.ceil(
    151 / pokemonPerPage
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <h1 className="mb-2 text-center text-4xl font-extrabold text-red-600 sm:text-5xl">
        Pokédex de Kanto
      </h1>

      <p className="mb-8 text-center text-gray-600">
        Explora los 151 Pokémon originales de Kanto
      </p>

      <PokemonList
        pokemonList={pokemonList}
        pokemonSearchList={pokemonSearchList}
        search={search}
      />



      {!search && (
        <div className="mt-10 flex items-center justify-center gap-4">
          {currentPage > 1 && (
            <a
              href={`/?page=${currentPage - 1}`}
              className="rounded-full bg-gray-800 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              ← Anterior
            </a>
          )}

          <span className="font-semibold text-gray-700">
            Página {currentPage} de{" "}
            {totalPages}
          </span>

          {currentPage < totalPages && (
            <a
              href={`/?page=${currentPage + 1}`}
              className="rounded-full bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
            >
              Siguiente →
            </a>
          )}
        </div>
      )}
    </main>
  );
}
