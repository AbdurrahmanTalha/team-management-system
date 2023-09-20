import express from "express";
import controller from "./team.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../../enum/user";

const router = express.Router();

router.post("/create-team", auth(ENUM_USER_ROLES.ADMIN), controller.createTeam);
router.post("/invite/", auth(ENUM_USER_ROLES.ADMIN), controller.inviteUser);
router.post("/invite/accept/:membershipId", auth(ENUM_USER_ROLES.TEAM_MEMBER), controller.acceptInvite);
router.post("/invite/deny/:membershipId", auth(ENUM_USER_ROLES.TEAM_MEMBER), controller.denyInvite);

export default router;
