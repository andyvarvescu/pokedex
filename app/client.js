"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import NameFilter from "@/components/name-filter";
import TypeFilter from "@/components/type-filter";
import PokemonsList from "@/components/pokemons-list";

export default function Client({ data }) {
  const [pokemons, setPokemons] = useState(data);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack direction="row" spacing={3}>
        <NameFilter />
        <TypeFilter values={pokemons} />
        <PokemonsList pokemons={pokemons} />
      </Stack>
    </>
  );
}
