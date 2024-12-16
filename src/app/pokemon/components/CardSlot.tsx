"use client";

import PokemonCard from "./PokemonCard";

const CardSlot = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pokemons.map((pokemon: { name: string }, index: number) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CardSlot;
