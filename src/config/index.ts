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
    JWT_EXPIRES_IN: z.string(),
    DATABASE_HOST: z.string()
});

const envVars = envVarsZodSchema.parse(process.env);

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    database: {
        user: envVars.DATABASE_USER,
        password: envVars.DATABASE_PASSWORD,
        database: envVars.DATABASE,
        host: envVars.DATABASE_HOST
    },
    jwt: {
        secret: envVars.SECRET,
        expires_in: envVars.JWT_EXPIRES_IN,
    },
};
