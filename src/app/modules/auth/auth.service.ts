import sql from "../../../shared/db";
import { IUser } from "./auth.interface";

const createUserService = async (payload: IUser) => {
    await sql.query(
        "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, 'Team Member')",
        [payload.username, payload.password, payload.email],
    );
};

export default { createUserService };
