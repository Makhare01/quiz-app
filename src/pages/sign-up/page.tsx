import { signUp } from "@api/auth";
import { useAuth } from "@app/auth";
import { paths } from "@app/routes";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError, passwordRegex } from "@lib/form";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).regex(passwordRegex, {
      message:
        "Must contain 8 characters, a digit, and an uppercase letter and a special symbol",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export type SignUpFormValues = z.infer<typeof FormSchema>;

export const SignUp = () => {
  const theme = useTheme();
  const { authorize } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const $signUp = useMutation({
    mutationFn: signUp,
  });

  return (
    <Box sx={{ width: 350 }}>
      <Typography variant="h1" fontWeight={700} mb={3}>
        Sign up
      </Typography>
      <Box
        component="form"
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        onSubmit={handleSubmit((values) => {
          $signUp.mutate(values, {
            onSuccess: (user) => {
              authorize(user);
              navigate(paths.dashboard);
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
            <TextField
              {...field}
              placeholder="Email"
              {...getFieldError(error)}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Password"
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
        >
          Sign up
        </Button>
      </Box>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          OR
        </Typography>
      </Divider>

      <Typography
        variant="body1"
        textAlign="center"
        fontWeight={600}
        color="text.primary"
        sx={{ textDecoration: "none" }}
      >
        Already have an account?{" "}
        <Link
          to={paths.signIn}
          style={{ textDecoration: "none", color: theme.palette.success.main }}
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  );
};
