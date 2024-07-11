import { IconClose } from "@app/assets/icons";
import { Box, IconButton } from "@mui/material";

type Props = {
  onClick: () => void;
};

export const BackCloseButton = ({ onClick }: Props) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        ":hover .close-icon": {
          color: "text.primary",
        },
      }}
    >
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
        <IconClose className="close-icon" />
      </Box>
    </IconButton>
  );
};
