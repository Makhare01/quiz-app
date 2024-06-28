import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError, passwordRegex } from "@lib/form";
import { Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    oldPassword: z.string().email(),
    newPassword: z.string().min(8).regex(passwordRegex, {
      message:
        "Must contain 8 characters, a digit, and an uppercase letter and a special symbol",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

type FormValues = z.infer<typeof FormSchema>;

export const PasswordTab = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const [oldPassword, newPassword, passwordConfirm] = watch([
    "oldPassword",
    "newPassword",
    "passwordConfirm",
  ]);

  return (
    <Box
      component="form"
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      onSubmit={handleSubmit((values) => {
        console.log(values);
      })}
    >
      <Controller
        control={control}
        name="oldPassword"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder="Old password"
            type="password"
            {...getFieldError(error)}
          />
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder="New password"
            type="password"
            {...getFieldError(error)}
          />
        )}
      />

      <Controller
        control={control}
        name="passwordConfirm"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder="Confirm password"
            type="password"
            {...getFieldError(error)}
          />
        )}
      />

      <Button
        variant="contained"
        type="submit"
        color="success"
        sx={{ color: "white" }}
        disabled={
          oldPassword === "" || newPassword === "" || passwordConfirm === ""
        }
      >
        Change
      </Button>
    </Box>
  );
};
