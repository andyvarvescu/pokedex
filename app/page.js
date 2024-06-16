"use client";
import { useState } from "react";
import "@fontsource/roboto/400.css";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function Home() {
  const [filterType, setFilterType] = useState("");

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack direction="row" spacing={3}>
        <TextField
          id="outlined-basic"
          label="Filter by Name"
          variant="outlined"
          size="small"
          value={"test"}
          onChange={(e) => {}}
        />
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="filter-by-type-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-by-type-label"
            id="filter-by-type"
            value={filterType}
            label="Select Type"
            onChange={handleTypeChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
