import { TUser, User } from "@api/auth";
import { request } from "@lib/request";
import { UpdatePasswordFormValues } from "@pages/profile/components/profile-tabs";

export const updateUser = async (input: User) => {
  return await request("/api/user/credentials").post(
    {
      body: input,
    },
    TUser
  );
};

export const updateUserPassword = async (
  input: UpdatePasswordFormValues & { userId: string }
) => {
  return await request("/api/user/change-password").post({
    body: input,
  });
};
