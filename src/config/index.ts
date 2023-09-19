import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVarsZodSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z
        .string()
        .default("5000")
        .refine(val => Number(val)),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE: z.string(),
    SECRET: z.string(),
    BASE_URL: z.string(),
    CLIENT_ID: z.string(),
    ISSUER: z.string(),
});

const envVars = envVarsZodSchema.parse(process.env);

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    database: {
        user: envVars.DATABASE_USER,
        password: envVars.DATABASE_PASSWORD,
        database: envVars.DATABASE,
    },
    auth: {
        secret: envVars.SECRET,
        baseURL: envVars.BASE_URL,
        clientID: envVars.CLIENT_ID,
        issuer: envVars.ISSUER,
    },
};
