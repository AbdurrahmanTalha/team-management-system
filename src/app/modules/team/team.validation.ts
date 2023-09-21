import { z } from "zod";

export const createTeamValidation = z.object({
    body: z.object({
        teamName: z.string({ required_error: "Team Name is required" }),
        teamCategory: z.string({ required_error: "Team Category is required" }),
        description: z.string({ required_error: "Team Description is required" }),
        goal: z.string({ required_error: "Goal is required" }),
    }),
});

export const updateTeamValidation = z.object({
    body: z.object({
        teamName: z.string().optional(),
        teamCategory: z.string().optional(),
        description: z.string().optional(),
        goal: z.string().optional(),
    }),
});
