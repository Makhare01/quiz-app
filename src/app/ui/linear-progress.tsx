import {
  Box,
  linearProgressClasses,
  LinearProgressProps,
  LinearProgress as MuiLinearProgress,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

type Props = LinearProgressProps & {
  label?: ReactNode;
};

export const LinearProgress = ({ label, ...props }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: 1 }}>
      <Box sx={{ width: "100%" }}>
        <MuiLinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: 15,
            borderRadius: 5,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: theme.palette.background.default,
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: theme.palette.success.main,
            },
            ...props.sx,
          }}
        />
      </Box>
      {label && <Box sx={{ minWidth: 35, ml: 2 }}>{label}</Box>}
    </Box>
  );
};
