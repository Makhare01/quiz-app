import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField as MuiTextfield,
  TextFieldProps,
  useTheme,
} from "@mui/material";
import { forwardRef } from "react";

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ label, helperText, ...props }, ref) => {
    const theme = useTheme();

    return (
      <FormControl margin="none" fullWidth required={props.required}>
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
        <MuiTextfield
          ref={ref}
          {...props}
          sx={{
            bgcolor: "white",
            border: "none",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                border: 1,
                borderColor: props.error ? "error.main" : "transparent",
              },
            },
            "& fieldset": { border: props.error ? "error.main" : "none" },
            ...props.sx,
          }}
          inputProps={{
            style: {
              color: theme.palette.text.primary,
              fontWeight: 700,
            },
            ...props.inputProps,
          }}
        />
        <FormHelperText
          error={props.error}
          sx={{
            ml: 0.5,
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "18px",
            color: "text.secondary",
          }}
        >
          {helperText}
        </FormHelperText>
      </FormControl>
    );
  }
);
