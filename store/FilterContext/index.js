import { createContext, useContext, useState } from "react";

const defaultState = { pokeName: "", pokeType: "" };
const FilterContext = createContext(defaultState);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  return context;
};

export default function FiltersContext({ children }) {
  const [pokeName, setPokeName] = useState("");
  const [pokeType, setPokeType] = useState("");

  return (
    <FilterContext.Provider
      value={{
        pokeName,
        pokeType,
        setPokeName,
        setPokeType,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
