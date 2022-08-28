import { Session } from "./session";

export interface LoginResponse{
    isValidCredentials: boolean;
    message: string;
    session: Session;
}