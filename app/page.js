"use client";
import "@fontsource/roboto/400.css";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      <Stack direction="row" spacing={1}>
        <TextField
          id="outlined-basic"
          label="filter by name input"
          variant="outlined"
          size="small"
          value={"test"}
          onChange={(e) => {}}
        />
      </Stack>
    </>
  );
}
