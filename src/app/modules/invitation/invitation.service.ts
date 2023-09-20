import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import sql from "../../../shared/db";
import { IUser } from "../auth/auth.interface";
import { IInvitation } from "./invitation.interface";

const inviteUserService = async (payload: { teamId: number; email: string; role: string }) => {
    const [userRows] = await sql.query("SELECT id FROM user WHERE email = ?", [payload.email]);

    if (!Array.isArray(userRows) || userRows.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const user = userRows[0] as IUser;

    await sql.query("INSERT INTO team_memberships (team_id, user_id, status, role) VALUES (?, ?, 'Pending', ?)", [
        payload.teamId,
        user.id,
        payload.role,
    ]);

    const [inviteRows] = await sql.query("SELECT * FROM team_memberships WHERE team_id = ? AND user_id = ?", [
        payload.teamId,
        user.id,
    ]);

    if (!Array.isArray(inviteRows) || inviteRows.length === 0) {
        throw new Error("Team invitation not found after insertion.");
    }

    const createdInvite = inviteRows[0] as IInvitation;

    return createdInvite;
};

const acceptInviteService = async (membership_id: string, userId: number) => {
    await sql.query("UPDATE team_memberships SET status = 'active' WHERE membership_id = ? AND user_id = ?", [
        membership_id,
        userId,
    ]);

    const [inviteRows] = await sql.query("SELECT * FROM team_memberships WHERE membership_id = ? AND user_id = ?", [
        membership_id,
        userId,
    ]);

    if (!Array.isArray(inviteRows) || inviteRows.length === 0) {
        throw new Error("Team invitation not found after updating.");
    }

    const createdInvite = inviteRows[0] as IInvitation;

    return createdInvite;
};
const denyInviteService = async (membership_id: string, userId: number) => {
    await sql.query("UPDATE team_memberships SET status = 'denied' WHERE membership_id = ? AND user_id = ?", [
        membership_id,
        userId,
    ]);

    const [inviteRows] = await sql.query("SELECT * FROM team_memberships WHERE membership_id = ? AND user_id = ?", [
        membership_id,
        userId,
    ]);

    if (!Array.isArray(inviteRows) || inviteRows.length === 0) {
        throw new Error("Team invitation not found after updating.");
    }

    const createdInvite = inviteRows[0] as IInvitation;

    return createdInvite;
};

export default { acceptInviteService, denyInviteService, inviteUserService };
