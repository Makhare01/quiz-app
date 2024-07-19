import { updateUserPassword } from "@api/user";
import { useAuth } from "@app/auth";
import { Button } from "@app/ui/button";
import { TextField } from "@app/ui/texfield";
import { ToastContent } from "@app/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError, passwordRegex } from "@lib/form";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z
  .object({
    oldPassword: z.string(),
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

export type UpdatePasswordFormValues = z.infer<typeof FormSchema>;

export const PasswordTab = () => {
  const { refetchRefreshToken } = useAuth();

  const { control, handleSubmit, watch, reset } =
    useForm<UpdatePasswordFormValues>({
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

  const $updatePassword = useMutation({
    mutationFn: updateUserPassword,
  });

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
        $updatePassword.mutate(values, {
          onSuccess: () => {
            refetchRefreshToken();
            reset();

            toast.success(
              <ToastContent title="Success">
                <Typography variant="body2">
                  Password successfully updated
                </Typography>
              </ToastContent>
            );
          },
        });
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
          oldPassword === "" ||
          newPassword === "" ||
          passwordConfirm === "" ||
          $updatePassword.isPending
        }
        isLoading={$updatePassword.isPending}
      >
        Change
      </Button>
    </Box>
  );
};
