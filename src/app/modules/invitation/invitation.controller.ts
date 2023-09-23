import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import service from "./invitation.service";
import { IInvitation } from "./invitation.interface";
import { getSocketIO } from "../../../socket";

const inviteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await service.inviteUserService(req.body);
    const timestamp = new Date();

    const io = getSocketIO();
    io.emit("invitationSent", { team: req.body.teamId, user: req.user, timestamp });

    sendResponse<IInvitation | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully sent invite",
        data: result,
    });
});

const acceptInvite = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized");
    }
    const result = await service.acceptInviteService(req.params.membershipId, req.user.userId);
    const io = getSocketIO();
    io.emit("invitationAccepted", { membershipId: result.membership_id, user: req.user.id });

    sendResponse<IInvitation>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully accepted invite",
        data: result,
    });
});

const denyInvite = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized");
    }
    const result = await service.denyInviteService(req.params.membershipId, req.user.userId);
    const io = getSocketIO();
    io.emit("invitationDenied", { membershipId: result.membership_id, user: req.user.id });

    sendResponse<IInvitation>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully denied invite",
        data: result,
    });
});

const getInvitations = catchAsync(async (req: Request, res: Response) => {
    const result = await service.getInvitationsService(req.params.teamId, req.params.status);
    sendResponse<IInvitation[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully found invites",
        data: result,
    });
});

export default { acceptInvite, denyInvite, inviteUser, getInvitations };
