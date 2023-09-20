import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./team.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IInvitation, ITeam } from "./team.interface";
import ApiError from "../../../errors/ApiError";

const createTeam = catchAsync(async (req: Request, res: Response) => {
    const result = await service.createTeamService(req.body);

    sendResponse<ITeam>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully created team",
        data: result,
    });
});

const inviteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await service.inviteUserService(req.body);

    sendResponse<IInvitation | null>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully sent invite",
        data: result,
    });
});

const acceptInvite = catchAsync(async (req: Request, res: Response) => {
    if(!req.user) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized")
    }
    const result = await service.acceptInviteService(req.params.membershipId, req.user.userId);

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

    sendResponse<IInvitation>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully denied invite",
        data: result,
    });
});


export default { createTeam, inviteUser, acceptInvite, denyInvite };
