"use client";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useFilterContext } from "@/store/FilterContext";

export default function TypeFilter({ values }) {
  const { pokemonType, setPokemonType } = useFilterContext();

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="filter-by-type-label">Filter by Type</InputLabel>
      <Select
        labelId="filter-by-type-label"
        id="filter-by-type"
        value={pokemonType}
        label="Select Type"
        onChange={(e) => setPokemonType(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {values.map((pokemon) => (
          <MenuItem value={pokemon.name}>{pokemon.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
