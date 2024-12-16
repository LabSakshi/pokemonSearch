/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Type definitions for Pokémon and its stats
interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
  types: PokemonType[];
}

export default function PokemonDetail() {
  const params = useParams(); // Unwrap params
  const { slug } = params;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (!slug) return;
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
        if (!res.ok) throw new Error("Pokémon not found");
        const data: Pokemon = await res.json(); // Typing the API response as Pokemon
        setPokemon(data);
      } catch (err) {
        setError(true);
      }
    };

    fetchPokemon();
  }, [slug]);

  if (error) {
    return (
      <div className="text-center mt-20 text-xl text-red-600">
        Pokémon not found!
      </div>
    );
  }

  if (!pokemon) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-center bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 capitalize mb-6">
        {pokemon.name}
      </h1>

      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-64 h-64 mx-auto mb-6 shadow-md rounded-lg"
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Base Stats
        </h2>
        <ul className="grid grid-cols-2 gap-4 text-left">
          {pokemon.stats.map((stat, index) => (
            <li key={index} className="text-lg text-gray-600 capitalize">
              <span className="font-medium">{stat.stat.name}:</span>{" "}
              {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Types</h2>
        <div className="flex justify-center gap-4">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-200 text-blue-800 rounded-full capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <a
          href="/pokemon"
          className="text-blue-500 hover:text-blue-700 text-lg font-semibold flex justify-center items-center mt-6"
        >
          ← Back
        </a>
      </div>
    </div>
  );
}
