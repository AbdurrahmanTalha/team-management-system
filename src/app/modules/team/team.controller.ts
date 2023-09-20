import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import service from "./team.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createTeam = catchAsync(async (req: Request, res: Response) => {
    const result = await service.createTeamService(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully created team",
        data: result,
    })
});

export default { createTeam };
