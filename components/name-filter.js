"use client";
import TextField from "@mui/material/TextField";

export default function NameFilter({ value, onChange }) {
  return (
    <TextField
      id="outlined-basic"
      label="Filter by Name"
      variant="outlined"
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
