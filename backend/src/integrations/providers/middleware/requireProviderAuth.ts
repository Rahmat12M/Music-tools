
import { Request, Response, NextFunction } from "express";
import { providers } from "../providerIndex";
import { tokenStorage } from "../tokenStorage";

type ProviderName = keyof typeof providers;

declare module "express-session" {
  interface SessionData {
    user?: {
      name: string;
      id?: string;
      email?: string;
    };
  }
}

 interface RequestUser extends Express.Request {
     username?: string;
 }


export function authUserBySession(req: RequestUser, res: Response, next: NextFunction) {
    console.log("Session content:", req.session)
     const username = req.session?.user?.name;

    console.log(`authUser - Middleware: ${username}`);

    if (!username) {
        return res.sendStatus(401); 
    }

    req.username = username;
    next();
}


export function requireProviderAuth(req: Request,res: Response,next: NextFunction) {
  const {userId} = req.params
  const providerName = req.params.provider 
   if (providerName !== "spotify" && providerName !== "soundcloud") {
    return res.status(404).json({ error: "Provider not found" });
  }
  const provider = providers[providerName]
 
  if (!provider) {
  return res.status(404).json({ error: "Provider not found" });
}
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).json({ error: 'No Token' });
  }
  const token = authHeader.split(' ')[1];
 
  const isValid = tokenStorage.validate(providerName, token, userId);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  next();
}

