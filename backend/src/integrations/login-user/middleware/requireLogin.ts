import type { Response, NextFunction } from "express";
import { RequestUser } from "../types";
import { findUserByUsername } from "../userFunction";

/**
 * 
 * @returns 
 */
export function requireLogin(req: RequestUser, res: Response, next: NextFunction) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  const user = findUserByUsername(req.session.user.name);
  req.user = user;
  next();
}