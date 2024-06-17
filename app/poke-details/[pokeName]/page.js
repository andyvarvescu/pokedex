import Typography from "@mui/material/Typography";

export default function PokeDetails({ params }) {
  const { pokeName } = params;

  return (
    <Typography variant="h4" gutterBottom>
      {pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}
    </Typography>
  );
}
