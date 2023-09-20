import { z } from "zod";

export const loginZodSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    }),
});

export const registerZodSchema = z.object({
    body: z.object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
        role: z.enum(["Team Member", "Admin"]),
    }),
});
