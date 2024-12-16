"use client";
import { useEffect, useState } from "react";
import CardSlot from "./components/CardSlot";
import useFetch from "../hooks/useFetch";
import UpperSlot from "./components/UpperSlot";
import axios from "axios";

// Type definitions
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonType {
  name: string;
  url: string;
}

interface PokemonTypeData {
  pokemon: { pokemon: { name: string } }[];
}

interface FetchResponse<T> {
  results: T;
}

export default function Home() {
  // API data hooks with proper typing
  const { data } = useFetch<FetchResponse<Pokemon>>(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );

  const { pokemonTypeData } = useFetch<FetchResponse<PokemonType>>(
    "https://pokeapi.co/api/v2/type/"
  );

  // State variables with types
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonType, setPokemonType] = useState<PokemonType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedTypeValue, setSelectedTypeValue] = useState<string>("");

  // Input change handler
  const onInputChange = (input: string) => {
    setInputValue(input);
  };

  // Type change handler
  const onTypeChange = (selectedType: string) => {
    setSelectedTypeValue(selectedType);
  };

  useEffect(() => {
    if (data) {
      let filteredPokemons = [...data.results];
      if (selectedTypeValue) {
        axios
          .get<PokemonTypeData>(
            `https://pokeapi.co/api/v2/type/${selectedTypeValue}`
          )
          .then((response) => {
            const typeFilteredPokemon = response.data.pokemon.map(
              (p) => p.pokemon.name
            );
            filteredPokemons = filteredPokemons.filter((pokemon) =>
              typeFilteredPokemon.includes(pokemon.name)
            );

            if (inputValue.length >= 1) {
              filteredPokemons = filteredPokemons.filter((poke) =>
                poke.name.startsWith(inputValue.toLowerCase())
              );
            }

            setPokemons(filteredPokemons);
          });
      } else if (inputValue.length >= 1) {
        filteredPokemons = filteredPokemons.filter((poke) =>
          poke.name.startsWith(inputValue.toLowerCase())
        );
        setPokemons(filteredPokemons);
      } else {
        setPokemons(filteredPokemons);
      }
    }

    if (pokemonTypeData) {
      setPokemonType(pokemonTypeData.results);
    }
  }, [data, pokemonTypeData, inputValue, selectedTypeValue]);

  return (
    <div className="m-20">
      <UpperSlot
        pokemonType={pokemonType}
        onInputChange={onInputChange}
        onTypeChange={onTypeChange}
      />
      <CardSlot pokemons={pokemons} />
    </div>
  );
}
