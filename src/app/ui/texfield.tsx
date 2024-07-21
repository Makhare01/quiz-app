import { IconEyeClose, IconEyeOpen } from "@app/assets/icons";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  TextField as MuiTextfield,
  TextFieldProps,
  useTheme,
} from "@mui/material";
import { forwardRef, useState } from "react";

export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ label, helperText, ...props }, ref) => {
    const theme = useTheme();
    const [inputType, setInputType] = useState(props.type);

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
        <Box display="flex" alignItems="stretch" width={1}>
          <MuiTextfield
            ref={ref}
            {...props}
            fullWidth
            type={inputType}
            sx={{
              bgcolor: "white",
              border: "none",
              borderRadius: 2,
              ...(props.type === "password" && {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }),
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
          {props.type === "password" && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 1,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                bgcolor: "white",
              }}
            >
              <IconButton
                onClick={() => {
                  setInputType((prevType) =>
                    prevType === "password" ? "text" : "password"
                  );
                }}
              >
                {inputType === "password" ? <IconEyeClose /> : <IconEyeOpen />}
              </IconButton>
            </Box>
          )}
        </Box>
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
