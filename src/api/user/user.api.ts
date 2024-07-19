import { TUser } from "@api/auth";
import { request } from "@lib/request";
import {
  UpdatePasswordFormValues,
  UpdateUserInfoFormValues,
} from "@pages/profile/components/profile-tabs";

export const updateUser = async (input: UpdateUserInfoFormValues) => {
  return await request("/api/user/credentials").patch(
    {
      body: input,
    },
    TUser
  );
};

export const updateUserPassword = async (input: UpdatePasswordFormValues) => {
  return await request("/api/user/change-password").patch({
    body: input,
  });
};

type UpdateUserFavoriteQuizzesInput = {
  quizId: string;
};

export const updateUserFavoriteQuizzes = async ({
  quizId,
}: UpdateUserFavoriteQuizzesInput) => {
  return await request("/api/user/favorite-quizzes").put({
    body: {
      quizId,
    },
  });
};
