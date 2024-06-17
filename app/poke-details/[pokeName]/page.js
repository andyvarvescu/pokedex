import { getAbilityById, getPokeByName } from "@/client/pokemons";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";

export default async function PokeDetails({ params }) {
  const { pokeName } = params;

  const pokemon = await getPokeByName(pokeName);
  const abilities = await Promise.all(
    pokemon.abilities.map(async (ability) => {
      const abilityDetail = await getAbilityById(
        ability.ability.url.split("/").at(-2)
      );

      return abilityDetail;
    })
  );

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}
      </Typography>

      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={3}>
          <Stack direction="column" spacing={2}>
            <Chip label={`Weight - ${pokemon.weight}`} />
            <Chip label={`Height - ${pokemon.height}`} />
            <Chip
              label={`Types - ${pokemon.types
                .reduce((types, typeDetail) => {
                  return types + typeDetail.type.name + " + ";
                }, "")
                .slice(0, -3)}`}
            />
          </Stack>

          <Avatar
            alt={pokeName}
            src={pokemon.sprites.other["official-artwork"].front_default}
            sx={{ width: 130, height: 130, border: "1px solid" }}
            variant="rounded"
          />
        </Stack>

        <List
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {abilities.map((ability) => (
            <ListItem key={ability} alignItems="flex-center">
              <Chip
                sx={{
                  height: "auto",
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                  },
                }}
                label={ability}
              />
            </ListItem>
          ))}
        </List>

        <Stack direction="row" spacing={6}>
          <Avatar
            alt={pokeName}
            src={pokemon.sprites.other.showdown.front_default}
            sx={{ width: 130, height: 130, border: "1px solid" }}
            variant="rounded"
          />
          <Avatar
            alt={pokeName}
            src={pokemon.sprites.other.showdown.back_default}
            sx={{ width: 130, height: 130, border: "1px solid" }}
            variant="rounded"
          />
        </Stack>
      </Stack>
    </Container>
  );
}
