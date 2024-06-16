"use client";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function TypeDropdown() {
  const [filterType, setFilterType] = useState("");

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
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
  );
}
