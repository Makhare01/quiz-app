import { refreshToken } from "@api/auth";
import { qk } from "@api/query-keys";
import { useBoolean } from "@lib/hooks";
import { useMutation } from "@tanstack/react-query";
import constate from "constate";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import { AuthUser } from "../../api/auth/auth.schema";
import { useAuthorize } from "./use-authorize";

export type UserState =
  | { state: "loading" }
  | { state: "authenticated"; info: AuthUser }
  | { state: "unauthenticated" };

const useAuthContext = () => {
  const isRefreshed = useBoolean();
  const [user, setUser] = useState<UserState>({
    state: "loading",
  });

  const $refreshToken = useMutation({
    mutationFn: refreshToken,
    mutationKey: qk.auth.token.refresh.toKey(),
    onSuccess: (user) => {
      authorize(user);
      isRefreshed.setTrue();
    },
    onError: () => {
      unauthorize();
      isRefreshed.setTrue();
    },
  });

  const { authorize, unauthorize } = useAuthorize({
    setUser,
    refetchRefreshToken: $refreshToken.mutate,
  });

  useEffectOnce(() => {
    if (isRefreshed.isFalse) {
      $refreshToken.mutate();
    }
  });

  return {
    authorize,
    unauthorize,
    user,
    refetchRefreshToken: $refreshToken.mutate,
  };
};

export const [AuthProvider, useAuth] = constate(useAuthContext);

export const useAuthUser = () => {
  const { user } = useAuth();

  if (user.state === "authenticated") {
    return user.info as AuthUser;
  }

  return null;
};
