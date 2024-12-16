/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
interface Pokemon {
  name: string;
  url: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        className="w-full h-32 object-contain mb-2"
      />
      <h2 className="text-lg font-medium capitalize text-center">
        {pokemon.name}
      </h2>
      <Link href={`/pokemon/${pokemon.name}`}>Details</Link>
    </div>
  );
};

export default PokemonCard;
