import { FieldError } from "react-hook-form";

export const getFieldError = (error?: FieldError) => {
  return error
    ? {
        error: true,
        helperText: error.message,
      }
    : {};
};
