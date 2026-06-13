import { Router } from "express";
import type { Request, Response } from 'express';
import { requireLogin } from "./middleware/requireLogin";

const userRouter: Router = Router();

userRouter.get('/user/:userID', requireLogin, (req: Request, res: Response) => {
  const userId: number = Number(req.params.userID);

  
});

export default userRouter;