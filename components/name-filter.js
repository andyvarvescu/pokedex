"use client";
import TextField from "@mui/material/TextField";

export default function NameInput() {
  return (
    <TextField
      id="outlined-basic"
      label="Filter by Name"
      variant="outlined"
      size="small"
      value={"test"}
      onChange={(e) => {}}
    />
  );
}
