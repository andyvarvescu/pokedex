import { createContext, useContext, useState } from "react";

const defaultState = { pokemonName: "", pokemonType: "" };
const FilterContext = createContext(defaultState);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  return context;
};

export default function FiltersContext({ children }) {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonType, setPokemonType] = useState("");

  return (
    <FilterContext.Provider
      value={{
        pokemonName,
        pokemonType,
        setPokemonName,
        setPokemonType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
