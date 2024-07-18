import { IconCheck } from "@app/assets/icons";
import {
  Box,
  CheckboxProps,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import { ReactNode } from "react";

type Props = CheckboxProps & {
  label?: ReactNode;
};

export const Checkbox = ({ label, ...props }: Props) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          {...props}
          sx={{
            color: "red",
            borderRadius: "50%",
          }}
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
              bgcolor="background.default"
              border={3}
              borderColor="success.main"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <IconCheck color="success" sx={{ fontSize: 20 }} />
            </Box>
          }
        />
      }
      label={label}
      sx={{
        bgcolor: "white",
        p: 1,
        m: 0,
        borderRadius: 2,
        border: 1,
        width: 1,
        borderColor: "white",
        ...(props.checked && {
          borderColor: "success.main",
        }),
      }}
    />
  );
};
