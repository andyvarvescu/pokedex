"use client";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import NameFilter from "@/components/name-filter";
import TypeFilter from "@/components/type-filter";
import PokesList from "@/components/pokemons-list";
import { useFilterContext } from "@/store/FilterContext";
import { getPokesByNameAndType } from "@/client/pokemons";

export default function Client({ pokes, types }) {
  const [pokeList, setPokeList] = useState(pokes);
  const { pokeName, setPokeName, pokeType, setPokeType } = useFilterContext();
  const [fetchOptions, setFetchOptions] = useState({
    fetchCallNo: 0,
    fetchedAll: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [marginReached, setMarginReached] = useState(true);
  const loadingTriggerRef = useRef();

  const getFilteredPokes = async () => {
    const { filteredPokes, totalCount } = await getPokesByNameAndType(
      pokeName,
      pokeType,
      fetchOptions.fetchCallNo * 15,
      15
    );
    setIsLoading(false);
    if (fetchOptions.fetchCallNo === 0) {
      setPokeList(filteredPokes);
    } else {
      setPokeList((previousPokeList) => [
        ...previousPokeList,
        ...filteredPokes,
      ]);
    }

    if (fetchOptions.fetchCallNo + 15 >= totalCount) {
      setFetchOptions((prevState) => ({
        ...prevState,
        fetchedAll: true,
      }));
    }
  };

  useEffect(() => {
    console.log("fetchOptions CHANGED");
    setIsLoading(true);
    getFilteredPokes();
  }, [pokeName, pokeType, fetchOptions]);

  const handleMarginReached = () => {
    if (!fetchOptions.fetchedAll) {
      setFetchOptions((prevState) => ({
        ...prevState,
        fetchCallNo: prevState.fetchCallNo + 1,
      }));
    }
  };

  useEffect(() => {
    setTimeout(() => setMarginReached(false), 500);
    if (loadingTriggerRef.current) {
      const observer = new IntersectionObserver(handleMarginReached);
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
          <NameFilter value={pokeName} onChange={setPokeName} />
          <TypeFilter types={types} value={pokeType} onChange={setPokeType} />
        </Stack>
        <PokesList pokes={pokeList} />
        {
          <div
            ref={loadingTriggerRef}
            className={`${marginReached && "mt-[500px]"} `}
          ></div>
        }
      </Stack>
    </>
  );
}
