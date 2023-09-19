import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const result = req.oidc.user;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Successfully found my profile",
    });
});

export default { getMyProfile };
