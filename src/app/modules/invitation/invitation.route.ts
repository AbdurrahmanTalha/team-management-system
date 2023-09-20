import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLES } from "../../../enum/user";
import controller from "./invitation.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createInvitationZodSchema } from "./invitation.validation";

const router = express.Router();

router.get("/:teamId/:status", auth(ENUM_USER_ROLES.ADMIN), controller.getInvitations);
router.patch("/:membershipId", auth(ENUM_USER_ROLES.TEAM_MEMBER), controller.acceptInvite);
router.delete("/:membershipId", auth(ENUM_USER_ROLES.TEAM_MEMBER), controller.denyInvite);
router.post("/", auth(ENUM_USER_ROLES.ADMIN), validateRequest(createInvitationZodSchema), controller.inviteUser);

export default router;
