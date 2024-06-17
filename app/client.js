"use client";
import { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

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
  const [totalPokes, setTotalPokes] = useState(0);
  const [marginReached, setMarginReached] = useState(true);
  const loadingTriggerRef = useRef();

  const getFilteredPokes = async (filtersChanged) => {
    const { pokes, totalCount } = await getPokesByNameAndType(
      pokeName,
      pokeType,
      fetchOptions.fetchCallNo * 15,
      15
    );
    setTotalPokes(totalCount);

    if (fetchOptions.fetchCallNo === 0) {
      setPokeList(pokes);
    } else {
      setPokeList((previousPokeList) => [...previousPokeList, ...pokes]);
    }

    if (filtersChanged) {
      setFetchOptions({
        fetchCallNo: 0,
        fetchedAll: false,
      });
    }
  };

  useEffect(() => {
    getFilteredPokes(true);
  }, [pokeName, pokeType]);

  useEffect(() => {
    getFilteredPokes(false);
  }, [fetchOptions]);

  const handleMarginReached = () => {
    if (!fetchOptions.fetchedAll) {
      setFetchOptions((prevState) => ({
        ...prevState,
        fetchCallNo: prevState.fetchCallNo + 1,
      }));
    }
    if (fetchOptions.fetchCallNo * 15 >= totalPokes) {
      setFetchOptions((prevState) => ({
        ...prevState,
        fetchedAll: true,
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

  const handleNameChange = (name) => {
    setPokeName(name);
  };

  const handleTypeChange = (type) => {
    setPokeType(type);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={3}
      >
        <Stack direction="row" spacing={3}>
          <NameFilter value={pokeName} onChange={handleNameChange} />
          <TypeFilter
            types={types}
            value={pokeType}
            onChange={handleTypeChange}
          />
        </Stack>
        <PokesList pokes={pokeList} />
        {
          <div
            ref={loadingTriggerRef}
            className={`${marginReached && "mt-[500px]"} `}
          ></div>
        }
      </Stack>
    </Container>
  );
}
