import express from "express";
import controller from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginZodSchema, registerZodSchema } from "./auth.validation";

const router = express.Router();

router.post("/register", validateRequest(registerZodSchema), controller.register);
router.post("/login", validateRequest(loginZodSchema), controller.login);

export default router;
