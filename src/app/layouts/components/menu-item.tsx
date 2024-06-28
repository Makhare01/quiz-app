import { useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import { MenuItem } from "./app-menu";

type Props = {
  menuItem: MenuItem;
};

export const MenItem = ({ menuItem }: Props) => {
  const theme = useTheme();

  return (
    <NavLink
      to={menuItem.path}
      style={({ isActive }) => ({
        fontWeight: 700,
        fontSize: 18,
        color: isActive
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
        textDecoration: "none",
      })}
    >
      {menuItem.name}
    </NavLink>
  );
};
