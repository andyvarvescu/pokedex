import "@fontsource/roboto/400.css";

import { getPokesByNameAndType, getTypes } from "@/client/pokemons";
import Client from "./client";

export default async function Page() {
  const { pokes } = await getPokesByNameAndType("", "", 0, 15);
  const types = await getTypes();

  return <Client pokes={pokes} types={types}></Client>;
}
