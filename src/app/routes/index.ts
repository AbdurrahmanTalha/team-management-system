import express from "express";
import authRouter from "../modules/auth/auth.route";
import teamRouter from "../modules/team/team.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        router: authRouter,
    },
    {
        path: "/team",
        router: teamRouter,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
