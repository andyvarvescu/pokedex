import "@fontsource/roboto/400.css";

import { getPokemons, getTypes } from "@/client/pokemons";
import Client from "./client";

export default async function Page() {
  const pokes = await getPokemons();
  const types = await getTypes();

  return <Client pokes={pokes} types={types}></Client>;
}
