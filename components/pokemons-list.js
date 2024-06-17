import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function PokesList({ pokes }) {
  console.log("pokes LIST = ", pokes);

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {pokes.map((poke) => (
        <ListItem key={poke.name} alignItems="flex-start">
          <ListItemButton>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={poke.sprite} />
            </ListItemAvatar>
            <ListItemText primary={poke.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
