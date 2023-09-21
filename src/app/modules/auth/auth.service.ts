import { Secret } from 'jsonwebtoken';
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import sql from "../../../shared/db";
import { ILoginPayload, ILoginUserResponse, IUser } from "./auth.interface";
import { RowDataPacket } from "mysql2";
import { createToken } from "../../../helpers/jwtHelpers";
import config from '../../../config';

const createUserService = async (payload: IUser): Promise<void> => {
    await sql.query("INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)", [
        payload.username,
        payload.password,
        payload.email,
        payload.role
    ]);
};

const loginUserService = async (payload: ILoginPayload): Promise<ILoginUserResponse> => {
    const { email, password } = payload;

    const [userRows] = await sql.query("SELECT id, password, role FROM user WHERE email = ?", [email]);

    if (!Array.isArray(userRows) || userRows.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
    }

    const user = userRows[0] as RowDataPacket;

    // Verify the password
    if (password !== user.password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    // Create an access token
    const accessToken = createToken(
        { userId: user.id, role: user.role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string,
    );

    return {
        accessToken,
    };
};

export default { createUserService, loginUserService };
