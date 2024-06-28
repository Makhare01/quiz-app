import { request } from "@lib/request";
import { SignInFormValues } from "@pages/sign-in";
import { SignUpFormValues } from "@pages/sign-up";
import { TAuthUser } from "./auth.schema";

export const signIn = async (input: SignInFormValues) => {
  return await request("/api/auth/sign-in").post(
    {
      body: input,
    },
    TAuthUser
  );
};

export const signUp = async (input: SignUpFormValues) => {
  return await request("/api/auth/sign-up").post(
    {
      body: input,
    },
    TAuthUser
  );
};

export type RefreshTokenInput = {
  refreshToken: string;
};

export const refreshToken = async () => {
  return await request("/api/auth/refresh").post({}, TAuthUser);
};

export const logout = async () => {
  return await request("/api/auth/logout ").delete({});
};
