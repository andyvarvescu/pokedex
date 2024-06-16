import "@fontsource/roboto/400.css";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { getPokemons } from "@/client/pokemons";
import NameInput from "@/components/name-filter";
import TypeDropdown from "@/components/type-filter";
import PokemonsList from "@/components/pokemonsList";

export default async function Home() {
  const pokemons = await getPokemons();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack direction="row" spacing={3}>
        <NameInput />
        <TypeDropdown />
        <PokemonsList pokemons={pokemons} />
      </Stack>
    </>
  );
}
