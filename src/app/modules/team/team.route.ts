import express from "express";
import controller from "./team.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../../enum/user";

const router = express.Router();

router.get("/:id", controller.getTeam);
router.patch("/:id", auth(ENUM_USER_ROLES.ADMIN), controller.updateTeam);
router.post("/", auth(ENUM_USER_ROLES.ADMIN), controller.createTeam);

export default router;
