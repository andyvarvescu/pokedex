"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import NameFilter from "@/components/name-filter";
import TypeFilter from "@/components/type-filter";
import PokemonsList from "@/components/pokemons-list";
import { useFilterContext } from "@/store/FilterContext";

export default function Client({ pokemons, types }) {
  const [pokemonList, setPokemonList] = useState(pokemons);
  const { pokemonName, setPokemonName, pokemonType, setPokemonType } =
    useFilterContext();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack direction="row" spacing={3}>
        <NameFilter value={pokemonName} onChange={setPokemonName} />
        <TypeFilter
          types={types}
          value={pokemonType}
          onChange={setPokemonType}
        />
        <PokemonsList pokemons={pokemonList} />
      </Stack>
    </>
  );
}
