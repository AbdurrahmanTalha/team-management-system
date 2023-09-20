export type IInvitation = {
    user_id: string;
    team_id: string;
    status?: "active" | "pending" | "deny";
};
