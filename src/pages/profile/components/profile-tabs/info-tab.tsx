import { updateUser } from "@api/user";
import { useAuth, useAuthUser } from "@app/auth";
import { Button } from "@app/ui/button";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export type UpdateUserInfoFormValues = z.infer<typeof FormSchema>;

export const InfoTab = () => {
  const { refetchRefreshToken } = useAuth();
  const authUser = useAuthUser();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<UpdateUserInfoFormValues>({
    defaultValues: {
      firstName: authUser?.user.firstName ?? "",
      lastName: authUser?.user.lastName ?? "",
      email: authUser?.user.email ?? "",
    },
    resolver: zodResolver(FormSchema),
  });

  const $credentials = useMutation({
    mutationFn: updateUser,
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
        $credentials.mutate(values, {
          onSuccess: (user) => {
            refetchRefreshToken();
            reset(user);
          },
        });
      })}
    >
      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder="First name"
            {...getFieldError(error)}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder="Last name"
            {...getFieldError(error)}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <TextField {...field} placeholder="Email" {...getFieldError(error)} />
        )}
      />

      <Button
        variant="contained"
        type="submit"
        color="success"
        sx={{ color: "white" }}
        disabled={!isDirty}
        isLoading={$credentials.isPending}
      >
        Save
      </Button>
    </Box>
  );
};
