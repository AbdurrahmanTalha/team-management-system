import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const checkContentType = (req: Request, res: Response, next: NextFunction) => {
    if (req.is("json")) {
        next();
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, "Only Json Content is Allowed");
    }
};


export default checkContentType