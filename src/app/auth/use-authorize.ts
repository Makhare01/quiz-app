import { jwtDecode } from "jwt-decode";
import { useCallback, useRef } from "react";
import { AuthUser } from "../../api/auth/auth.schema";
import {
  AccessTokenPayload,
  TAccessTokenPayload,
  setGlobalAccessToken,
} from "./access-token";
import { UserState } from "./use-auth";

type Args = {
  setUser: (user: UserState) => void;
  refetchRefreshToken: () => void;
};

export const useAuthorize = ({ setUser, refetchRefreshToken }: Args) => {
  const refreshTimeoutRef = useRef<number | null>(null);

  const authorize = useCallback(
    (user: AuthUser) => {
      const payload: AccessTokenPayload = jwtDecode(user.accessToken);

      const decodedPayload = TAccessTokenPayload.safeParse(payload);

      if (decodedPayload.success) {
        setGlobalAccessToken(user.accessToken);

        setUser({
          state: "authenticated",
          info: user,
        });

        const expiresIn = payload.exp * 1000 - Date.now();

        refreshTimeoutRef.current = window.setTimeout(() => {
          refreshTimeoutRef.current = null;
          refetchRefreshToken();
        }, expiresIn);
      } else {
        setUser({
          state: "unauthenticated",
        });
      }
    },
    [refetchRefreshToken, setUser]
  );

  const unauthorize = useCallback(() => {
    setGlobalAccessToken(null);
    setUser({ state: "unauthenticated" });
    if (refreshTimeoutRef.current !== null) {
      window.clearTimeout(refreshTimeoutRef.current);
    }
  }, [setUser]);

  return {
    authorize,
    unauthorize,
  };
};
