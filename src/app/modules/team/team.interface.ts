export type ITeam = {
    teamName: string;
    teamCategory: string;
    description: string;
    goal: string;
};

export type IInvitation = {
    user_id: string;
    team_id: string;
    status?: "active" | "pending" | "deny";
};
