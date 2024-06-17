import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

export default function PokesList({ pokes }) {
  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {pokes.map((poke) => (
        <Link href={`/poke-details/${poke.name}`} key={poke.name}>
          <ListItem alignItems="flex-center">
            <ListItemButton style={{ justifyContent: "center" }}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={poke.sprite} />
              </ListItemAvatar>
              <ListItemText
                primary={poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
