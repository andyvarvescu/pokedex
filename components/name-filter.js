"use client";
import TextField from "@mui/material/TextField";

import { useFilterContext } from "@/store/FilterContext";

export default function NameFilter() {
  const { pokemonName, setPokemonName } = useFilterContext();

  return (
    <TextField
      id="outlined-basic"
      label="Filter by Name"
      variant="outlined"
      size="small"
      value={pokemonName}
      onChange={(e) => setPokemonName(e.target.value)}
    />
  );
}
