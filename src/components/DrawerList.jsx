import { Draw } from "@mui/icons-material";
import { ConstDrawerList } from "./ConstDrawerList";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function DrawerList() {
  const navigate = useNavigate();

  return (
    <>
      {ConstDrawerList.map((item) => (
        <ListItem
          key={item.id}
          disablePadding
          sx={{ display: "block" }}
          onClick={() => navigate(item.route)}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}
