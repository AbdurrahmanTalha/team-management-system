import express from "express";
import authRouter from "../modules/auth/auth.route";
import teamRouter from "../modules/team/team.route";
import invitationRouter from "../modules/invitation/invitation.route";

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
    {
        path: "/invitations",
        router: invitationRouter,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.router));

export default router;
