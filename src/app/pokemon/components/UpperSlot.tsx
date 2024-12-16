import { ChangeEvent, FC } from "react";
import useFetch from "@/app/hooks/useFetch";

// Type definitions
interface PokemonType {
  name: string;
  url: string;
}

interface PokemonTypeResponse {
  results: PokemonType[];
}

// Props interface for UpperSlot component
interface UpperSlotProps {
  pokemonType: PokemonType[]; // Assuming you want to pass pokemonType from parent
  onInputChange: (input: string) => void;
  onTypeChange: (selectedType: string) => void;
}

const UpperSlot: FC<UpperSlotProps> = ({ onInputChange, onTypeChange }) => {
  const { data } = useFetch<PokemonTypeResponse>(
    "https://pokeapi.co/api/v2/type"
  );

  return (
    <div className="pl-4">
      <div className="w-3/4">
        <select
          id="options"
          className="rounded-md border border-neutral-700 bg-white py-2 px-3 h-12 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onTypeChange(e.target.value)
          }
        >
          <option value="">Select Type</option>
          {data &&
            data.results.map((type) => {
              return (
                <option value={type.name} key={type.name}>
                  {type.name}
                </option>
              );
            })}
        </select>
      </div>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-1/4 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-10"
        placeholder="Search."
        type="text"
        name="search"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onInputChange(e.target.value)
        }
      />
    </div>
  );
};

export default UpperSlot;
