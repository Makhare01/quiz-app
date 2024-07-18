import { IconUser } from "@app/assets/icons";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { BackCloseButton } from "@components/back-close-button";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProfileTabs } from "./components";

export const Profile = () => {
  const authUser = useAuthUser();

  const navigate = useNavigate();

  return (
    <Box
      height={1}
      width={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
    >
      <Box
        width={1}
        px={3}
        py={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconUser />
          <Typography variant="h4" fontWeight={700}>
            {authUser?.user.firstName + " " + authUser?.user.lastName}
          </Typography>
        </Box>

        <BackCloseButton onClick={() => navigate(paths.dashboard)} />
      </Box>

      <ProfileTabs />
    </Box>
  );
};
