import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import service from "./auth.service";
import { ILoginUserResponse } from "./auth.interface";

const register = catchAsync(async (req: Request, res: Response) => {
    await service.createUserService(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully registered",
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await service.loginUserService(req.body);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Successfully logged in",
        data: result,
    });
});

export default { register, login };
