import {
  Box,
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps,
} from "@mui/material";
import { ReactNode } from "react";

type Props = RadioProps & {
  label?: ReactNode;
  value?: string;
};

export const Radio = ({ label, value, ...radioProps }: Props) => {
  return (
    <FormControlLabel
      value={value}
      control={
        <MuiRadio
          {...radioProps}
          disableRipple
          icon={
            <Box
              width={30}
              height={30}
              borderRadius="50%"
              bgcolor="background.default"
            />
          }
          checkedIcon={
            <Box
              width={30}
              height={30}
              borderRadius="50%"
              border={2}
              borderColor="success.main"
              bgcolor="background.default"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={0}
            >
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  bgcolor: "success.main",
                  borderRadius: "50%",
                }}
              />
            </Box>
          }
        />
      }
      label={label}
      sx={{
        p: 2,
        my: 1,
        bgcolor: "white",
        borderRadius: 2,
      }}
    />
  );
};
