import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../../enum/user";
import controller from "./invitation.controller";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLES.ADMIN), controller.inviteUser);
router.patch("/:membershipId", auth(ENUM_USER_ROLES.TEAM_MEMBER), controller.acceptInvite);
router.delete("/:membershipId", auth(ENUM_USER_ROLES.TEAM_MEMBER), controller.denyInvite);

export default router;
