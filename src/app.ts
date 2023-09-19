import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// import router from "./app/routes";
import { auth } from "express-openid-connect";
import config from "./config";
import router from "./app/routes";

const app: Application = express();

const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: config.auth.secret,
    baseURL: config.auth.baseURL,
    clientID: config.auth.clientID,
    issuerBaseURL: config.auth.issuer,
};

app.use(auth(authConfig));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.use(globalErrorHandler);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
});

export default app;
