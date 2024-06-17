"use client";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

import NameFilter from "@/components/name-filter";
import TypeFilter from "@/components/type-filter";
import PokesList from "@/components/pokemons-list";
import { useFilterContext } from "@/store/FilterContext";
import { getPokesByNameAndType } from "@/client/pokemons";

export default function Client({ pokemons, types }) {
  const [pokemonList, setPokemonList] = useState(pokemons);
  const { pokemonName, setPokemonName, pokemonType, setPokemonType } =
    useFilterContext();
  const [fetchOptions, setFetchOptions] = useState({
    fetchCallNo: 0,
    fetchedAll: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const loadingTriggerRef = useRef();

  const getFilteredPokes = async () => {
    const filteredPokes = await getPokesByNameAndType(
      pokemonName,
      pokemonType,
      fetchOptions.fetchCallNo * 15,
      15
    );
    setIsLoading(false);
    setPokemonList(filteredPokes);
  };

  useEffect(() => {
    setIsLoading(true);
    getFilteredPokes();
  }, [pokemonName, pokemonType, fetchOptions]);

  const handleLoading = () => {
    if (!fetchOptions.fetchedAll) {
      setFetchOptions((prevState) => ({
        ...prevState,
        fetchCallNo: prevState.fetchCallNo + 1,
      }));
    }
  };

  useEffect(() => {
    if (loadingTriggerRef.current) {
      const observer = new IntersectionObserver(handleLoading);
      observer.observe(loadingTriggerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [loadingTriggerRef]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={3}
      >
        <Stack direction="row" spacing={3}>
          <NameFilter value={pokemonName} onChange={setPokemonName} />
          <TypeFilter
            types={types}
            value={pokemonType}
            onChange={setPokemonType}
          />
        </Stack>
        <PokesList pokes={pokemonList} />
        {isLoading && <CircularProgress ref={loadingTriggerRef} />}
      </Stack>
    </>
  );
}
