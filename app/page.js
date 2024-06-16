import "@fontsource/roboto/400.css";

import { getPokemons } from "@/client/pokemons";
import Client from "./client";

export default async function Page() {
  const data = await getPokemons();

  return <Client data={data}></Client>;
}
