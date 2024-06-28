import { useAuthUser } from "@app/auth";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import { Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

type FormValues = z.infer<typeof FormSchema>;

export const InfoTab = () => {
  const authUser = useAuthUser();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: authUser?.user.firstName ?? "",
      lastName: authUser?.user.lastName ?? "",
      email: authUser?.user.email ?? "",
    },
    resolver: zodResolver(FormSchema),
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
        console.log(values);
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
      >
        Save
      </Button>
    </Box>
  );
};
