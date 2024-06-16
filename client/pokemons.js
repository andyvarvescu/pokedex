import { PokemonClient } from "pokenode-ts";

export async function getPokemons() {
  const api = new PokemonClient();
  const pokemons = await api.listPokemons(0, 5).then((data) => data.results);

  return pokemons;
}

export async function getTypes() {
  const api = new PokemonClient();
  const types = await api.listTypes(0).then((data) => data.results);

  return types;
}
