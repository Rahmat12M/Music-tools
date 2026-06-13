import { Request } from "express";

export type UserDB = {
  id: number;
  username: string;
  passwordHash: string;
  provider: string[];
  providerUserID: string[];
};

export interface RequestUser extends Request {
  user?: UserDB;
}