import { logout } from "@api/auth";
import { IconArrow } from "@app/assets/icons";
import { useAuth, useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { MouseEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <IconButton onClick={onClick}>
      <Box
        sx={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "white",
          borderRadius: "50%",
        }}
      >
        {children}
      </Box>
    </IconButton>
  );
};

export const UserProfileButton = () => {
  const { unauthorize } = useAuth();
  const authUser = useAuthUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const $logout = useMutation({
    mutationFn: logout,
  });

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <ProfileButton onClick={() => navigate(paths.profile)}>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{
            color:
              location.pathname === paths.profile
                ? "success.main"
                : "text.primary",
          }}
        >
          {authUser?.user.firstName.charAt(0)}
        </Typography>
      </ProfileButton>

      <ProfileButton onClick={handleClick}>
        <IconArrow direction={open ? "up" : "down"} sx={{ fontSize: 14 }} />
      </ProfileButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 21,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            $logout.mutate(undefined, {
              onSuccess() {
                unauthorize();
              },
            });
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
