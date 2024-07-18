import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import { forwardRef } from "react";

type DatePickerProps = MuiDatePickerProps<Date> & {
  helperText?: string;
  error?: boolean;
  required?: boolean;
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ label, helperText, ...props }, ref) => {
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
        <MuiDatePicker
          ref={ref}
          {...props}
          slotProps={{
            textField: {
              sx: {
                bgcolor: "background.default",
                borderRadius: 2,
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
                ...props.sx,
              },
            },
          }}
        />
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
      </FormControl>
    );
  }
);
