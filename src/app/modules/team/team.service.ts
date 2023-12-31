import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import sql from "../../../shared/db";
import { ITeam } from "./team.interface";
import { logger } from "../../../shared/logger";

const createTeamService = async (payload: ITeam): Promise<ITeam> => {
    await sql.query("INSERT INTO team (teamName, teamCategory, description, goal) VALUES (?, ?, ?, ?)", [
        payload.teamName,
        payload.teamCategory,
        payload.description,
        payload.goal,
    ]);

    const [result] = await sql.query("SELECT * FROM team WHERE teamName = ? AND teamCategory = ?", [
        payload.teamName,
        payload.teamCategory,
    ]);

    logger.info(`Team has been created ${payload.teamName} - ${payload.teamCategory}`);

    if (Array.isArray(result) && result.length > 0) {
        const createdTeam = result[0] as ITeam;
        return createdTeam;
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, "Team not found after insertion.");
    }
};

const getTeamService = async (payload: string): Promise<ITeam> => {
    const [result] = await sql.query("SELECT * FROM team WHERE id = ?", [payload]);

    if (Array.isArray(result) && result.length > 0) {
        const createdTeam = result[0] as ITeam;
        return createdTeam;
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, "Team not found.");
    }
};

const updateTeamService = async (teamId: string, payload: Partial<ITeam>): Promise<ITeam> => {
    const [exists] = await sql.query("SELECT * FROM team WHERE id = ?", [teamId]);
    if (Array.isArray(exists) && exists.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team not found.");
    }

    const updateColumns = [];
    const updateValues = [];

    for (const key in payload) {
        updateColumns.push(`${key} = ?`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateValues.push((payload as any)[key]);
    }

    const updateQuery = `UPDATE team SET ${updateColumns.join(", ")} WHERE id = ?`;
    updateValues.push(teamId);
    await sql.query(updateQuery, updateValues);
    logger.info(`Team has been updated`);

    const [result] = await sql.query("SELECT * FROM team WHERE id = ?", [teamId]);

    if (Array.isArray(result) && result.length > 0) {
        const updatedTeam = result[0] as ITeam;
        return updatedTeam;
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, "Team not found.");
    }
};

const deleteTeamService = async (id: string): Promise<ITeam | null> => {
    const [team] = await sql.query("SELECT * FROM team WHERE id = ?", [id]);
    if (Array.isArray(team) && team.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team not found.");
    }

    await sql.query("DELETE FROM team WHERE id = ?", [id]);
    if (Array.isArray(team) && team.length > 0) {
        const result = team[0] as ITeam;
        logger.info(`Team has been deleted`);
        return result;
    }

    return null;
};

export default { createTeamService, getTeamService, updateTeamService, deleteTeamService };
