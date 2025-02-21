import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
} from "@mui/material";
import { forwardRef, ReactNode } from "react";

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

type Props = SelectProps & {
  options: Array<SelectOption>;
  itemAction?: (index?: number) => ReactNode;
  helperText?: string;
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ options, itemAction, label, helperText, ...props }, ref) => {
    return (
      <Box width={1}>
        <InputLabel
          error={props.error}
          required={props.required}
          sx={{
            ml: 0.5,
            transform: "none",
            position: "static",
            fontSize: "14px",
            lineHeight: "26px",
            fontWeight: 700,
            zIndex: 0,
          }}
        >
          {label}
        </InputLabel>
        <MuiSelect
          ref={ref}
          {...props}
          sx={{
            bgcolor: "white",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
            ...props.sx,
          }}
          MenuProps={{
            MenuListProps: {
              sx: {
                ".MuiMenuItem-root": {
                  ":hover": {
                    bgcolor: "success.light",
                  },
                },
                "&& .Mui-selected": {
                  bgcolor: "success.main",
                  ":hover": {
                    bgcolor: "success.main",
                  },
                },
              },
            },
            PaperProps: {
              sx: {
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                border: 1,
                borderColor: "divider",
                mt: 0.25,
              },
            },
          }}
        >
          {options.map(({ label, value }, index) => (
            <MenuItem
              key={value + index}
              value={value}
              sx={{
                py: 2,
              }}
            >
              <Box
                width={1}
                display="flex"
                alignItems="Center"
                justifyContent="space-between"
              >
                {label}
                {itemAction?.(index)}
              </Box>
            </MenuItem>
          ))}
        </MuiSelect>
        <FormHelperText
          error={props.error}
          sx={{
            ml: 0.5,
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "18px",
            color: "text.disabled",
          }}
        >
          {helperText}
        </FormHelperText>
      </Box>
    );
  }
);
