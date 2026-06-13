import { Router } from "express";
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { findUserByUsername } from "./userFunction";
import { requireLogin } from "./middleware/requireLogin";
import { RequestUser } from "./types";

const authRouter: Router = Router();

/**
 * 
 */
authRouter.post("/login", (req: Request, res: Response) => {
  console.log('Enpoint /login');

  const username = String(req.body.username ?? "");
  const password = String(req.body.password ?? "");

  console.log(`username: ${username} - password: ${password}`);

  const user = findUserByUsername(username);
  if (!user) return res.sendStatus(401);

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return res.sendStatus(401);

  req.session.user = {name: username};
  return res.status(202).json(user.provider);
});

/**
 * Der automatisierte Login.
 */
authRouter.get("/login", requireLogin, (req: RequestUser, res: Response) => {
  res.status(202).json(req.user?.provider);
});

/**
 * 
 */
authRouter.get("/logout", requireLogin, (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      return res.sendStatus(500);
    }
  });

  res.clearCookie('connect.sid');
  res.sendStatus(200);
});

export default authRouter;