export interface IUserData {
    email: string;
    name: string;
    refreshToken: string;
    accessToken: string;
}

export type TypeRole = 'admin' | 'user' | undefined;
