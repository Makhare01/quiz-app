import { z } from "zod";

export const TAccessTokenPayload = z.object({
  exp: z.number(),
  iat: z.number(),
  userId: z.string(),
});

export type AccessTokenPayload = z.infer<typeof TAccessTokenPayload>;

export let globalAccessToken: string | null = null;

export const setGlobalAccessToken = (accessToken: string | null) => {
  globalAccessToken = accessToken;
};
