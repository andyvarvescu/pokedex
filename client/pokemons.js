import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export async function getPokemons() {
  const pokemons = await api.listPokemons(0, -1).then((data) => data.results);

  return pokemons;
}

export async function getTypes() {
  const types = await api.listTypes(0).then((data) => data.results);

  return types;
}

export async function getPokesByNameAndType(name, type, offset, limit) {
  let filteredPokes, totalCount;

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
  totalCount = filteredPokes.length;

  filteredPokes = filteredPokes.slice(offset, offset + limit);

  filteredPokes = await Promise.all(
    filteredPokes.map(async (pokemon) => {
      const sprite = await getSpriteByName(pokemon.name);
      return { name: pokemon.name, sprite };
    })
  );

  return { pokes: filteredPokes, totalCount };
}

export async function getSpriteByName(name) {
  const pokemon = await api.getPokemonByName(name).then((data) => data);
  const spriteSrc = pokemon.sprites.other["official-artwork"].front_default;

  return spriteSrc;
}

export async function getPokeByName(name) {
  const pokemon = await api.getPokemonByName(name).then((data) => data);

  return pokemon;
}

export async function getAbilityById(id) {
  const ability = await api.getAbilityById(id).then((data) => data);

  for (let effect of ability.effect_entries) {
    if (effect.language.name === "en") {
      return effect.effect;
    }
  }
}
