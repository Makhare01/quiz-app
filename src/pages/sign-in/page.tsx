import { signIn } from "@api/auth";
import { useAuth } from "@app/auth";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import {
  Box,
  CircularProgress,
  Divider,
  FormHelperText,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInFormValues = z.infer<typeof FormSchema>;

export const SignIn = () => {
  const theme = useTheme();
  const { authorize } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const $sighIn = useMutation({
    mutationFn: signIn,
  });

  return (
    <Box sx={{ width: 350 }}>
      <Typography variant="h1" fontWeight={700} mb={3}>
        Sign in
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
          $sighIn.mutate(values, {
            onSuccess: (user) => {
              authorize(user);
              navigate(paths.dashboard);
            },
            onError: (error) => {
              const requestError = error as unknown as {
                errors: Record<string, string>;
              };

              setError("email", {});
              setError("password", {});
              setError("root", {
                message: requestError.errors["credentials"]!,
              });
            },
          });
        })}
      >
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

        {errors.root && (
          <FormHelperText error>{errors.root.message}</FormHelperText>
        )}

        <Button
          variant="contained"
          type="submit"
          color="success"
          sx={{ color: "white" }}
          disabled={$sighIn.isPending}
        >
          {$sighIn.isPending ? <CircularProgress size={18} /> : "Sign in"}
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
        Don't have an account?
        <Link
          to={paths.signUp}
          style={{ textDecoration: "none", color: theme.palette.success.main }}
        >
          {" "}
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};
