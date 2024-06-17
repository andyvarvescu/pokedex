import { PokemonClient } from "pokenode-ts";

export async function getPokemons() {
  const api = new PokemonClient();
  const pokemons = await api.listPokemons(0, -1).then((data) => data.results);

  return pokemons;
}

export async function getTypes() {
  const api = new PokemonClient();
  const types = await api.listTypes(0).then((data) => data.results);

  return types;
}

export async function getPokesByNameAndType(name, type, offset, limit) {
  const api = new PokemonClient();
  let filteredPokes;

  if (type) {
    filteredPokes = await api
      .getTypeByName(type.name)
      .then((data) => data.pokemon);
    filteredPokes = filteredPokes.map((pokemon) => pokemon.pokemon);
  } else {
    filteredPokes = await api.listPokemons(0, -1).then((data) => data.results);
  }

  if (name) {
    filteredPokes = filteredPokes.filter((pokemon) =>
      pokemon.name.includes(name)
    );
  }
  filteredPokes = filteredPokes.slice(offset, offset + limit);
  console.log("filteredPokes = ", filteredPokes);

  filteredPokes = await Promise.all(
    filteredPokes.map(async (pokemon) => {
      const sprite = await getSpriteByName(pokemon.name);
      return { name: pokemon.name, sprite };
    })
  );

  return filteredPokes;
}

export async function getSpriteByName(name) {
  const api = new PokemonClient();

  const pokemon = await api.getPokemonByName(name).then((data) => data);
  const spriteSrc = pokemon.sprites.other["official-artwork"]["front_default"];

  return spriteSrc;
}
