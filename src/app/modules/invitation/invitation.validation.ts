import { z } from "zod";

export const createInvitationZodSchema = z.object({
    body: z.object({
        teamId: z.string({ required_error: "Team ID is required" }),
        email: z.string({ required_error: "Email is required" }),
        role: z.string({ required_error: "Role is required" }),
    }),
});
