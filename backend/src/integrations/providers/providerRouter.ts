import { Router } from "express";
import { providers } from "./providerIndex";
import multer from "multer";
import {
  authUserBySession,
  requireProviderAuth,
} from "./middleware/requireProviderAuth";
import users from "../../../data/users.json"
import findUserByName from "./middleware/finduserByName";
import addProviderToUser from "./middleware/addProviderTouser";

const providerRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

// type ProviderTokens = {
//   id: string,
//   token: string
// }
// const arrayProvideTokens: ProviderTokens[] | null = null;

providerRouter.get(`/:provider/login`, (req, res) => {
  const key = req.params.provider as keyof typeof providers;
  const provider = providers[key];

  if (!provider) {
    return res.status(404).send("Provider not Found");
  }
  res.redirect(provider.getAuthUrl());
});

providerRouter.get(`/:provider/callback`, async (req, res) => {
  const key = req.params.provider as keyof typeof providers;
  const provider = providers[key];

  const code = req.query.code as string;
  if (!provider || !code) {
    return res.status(400).send("Invalid Callback");
  }

  const tokenData = await provider.handleCallback(code);
  const userName = req.session.user?.name;
  if (!userName) return res.status(401).send("no session");
  const appuserId = await findUserByName(userName)
  await addProviderToUser(appuserId, key)
                              //access_token fehler mit tokenstorage?
  res.cookie(`${key}_token`, tokenData.access_token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.send("Login erfolgreich");
});

providerRouter.get(
  "/:provider/download",
  authUserBySession,
  requireProviderAuth,
  async (req, res) => {
    const { userId } = req.params;
    const key = req.params.provider as keyof typeof providers;
    const provider = providers[key];
    if (!provider) {
      return res.status(404).send("Provider not found");
    }
    try {
      const tracks = await provider.downloadTracks(userId);
      res.json(tracks);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },
);
providerRouter.post(
  "/:provider/upload",
  authUserBySession,
  requireProviderAuth,
  upload.single("file"),
  async (req, res) => {
    const { userId } = req.params;
    const key = req.params.provider as keyof typeof providers;
    const provider = providers[key];
    if (!provider || !provider.uploadTrack) {
      return res.status(404).send("Upload not supported");
    }
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded");
    }
    try {
      const result = await provider.uploadTrack(userId, file);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },
);

export default providerRouter;
