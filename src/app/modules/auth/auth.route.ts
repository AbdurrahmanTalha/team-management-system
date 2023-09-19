import express from "express";
import controller from "./auth.controller";
import { requiresAuth } from "express-openid-connect";

const router = express.Router();

router.get("/my-profile", requiresAuth(), controller.getMyProfile);

export default router;
