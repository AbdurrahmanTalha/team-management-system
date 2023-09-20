import sql from "../../../shared/db";
import { ITeam } from "./team.interface";

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

    if (Array.isArray(result) && result.length > 0) {
        const createdTeam = result[0] as ITeam;
        return createdTeam;
    } else {
        throw new Error("Team not found after insertion.");
    }
};

export default { createTeamService };
