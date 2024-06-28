import { z } from "zod";

export const TUser = z.object({
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export const TAuthUser = z.object({
  accessToken: z.string(),
  user: TUser,
});

export type AuthUser = z.infer<typeof TAuthUser>;
