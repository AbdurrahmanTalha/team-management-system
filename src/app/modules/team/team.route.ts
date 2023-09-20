import express from "express";
import controller from "./team.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../../enum/user";
import validateRequest from "../../middlewares/validateRequest";
import { createTeamValidation, updateTeamValidation } from "./team.validation";

const router = express.Router();

router.get("/:id", controller.getTeam);
router.delete("/:id", auth(ENUM_USER_ROLES.ADMIN), controller.deleteTeam);
router.patch("/:id", auth(ENUM_USER_ROLES.ADMIN), validateRequest(updateTeamValidation), controller.updateTeam);
router.post("/", auth(ENUM_USER_ROLES.ADMIN), validateRequest(createTeamValidation), controller.createTeam);

export default router;
