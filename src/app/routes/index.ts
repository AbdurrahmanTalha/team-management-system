import express from "express";
import authRouter from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        router: authRouter,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
