"use client";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function TypeFilter({ types, value, onChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="filter-by-type-label">Filter by Type</InputLabel>
      <Select
        labelId="filter-by-type-label"
        id="filter-by-type"
        value={value}
        label="Select Type"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {types.map((type) => (
          <MenuItem value={type} key={type.name}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
