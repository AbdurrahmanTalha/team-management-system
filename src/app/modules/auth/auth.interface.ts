export type IUser = {
    username: string;
    password: string;
    email: string;
    role: "Admin" | "Team Member";
};

export type ILoginPayload = {
    email: string;
    password: string;
}

export type ILoginUserResponse = {
    accessToken: string
}