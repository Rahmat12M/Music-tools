
import { MusicProvider } from "../MusicProvider";
import { tokenStorage } from "../tokenStorage";
import FormData from "form-data";


export const soundcloudProvider: MusicProvider = {
  name: "soundcloud",

  getAuthUrl() {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.SOUNDCLOUD_CLIENT_ID!,
      redirect_uri: process.env.SOUNDCLOUD_REDIRECT_URI!,
      scope: "", // SoundCloud nutzt selten Scopes, Standard reicht
    });

    return `https://soundcloud.com/connect?${params.toString()}`;
  },

  async handleCallback(code: string) {
    

    // Tausche Code gegen Token
    const response = await fetch("https://api.soundcloud.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: process.env.SOUNDCLOUD_CLIENT_ID!,
        client_secret: process.env.SOUNDCLOUD_CLIENT_SECRET!,
        redirect_uri: process.env.SOUNDCLOUD_REDIRECT_URI!,
      }),
    });

    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    //==========================================
    const userRes = await fetch("https://api.soundcloud.com/me", {
      headers: { Authorization: `OAuth ${accessToken}` },
    });
    // UserId bestimmt
    const userData = await userRes.json();
    const userId = userData.id.toString();
    // Token speichern
    tokenStorage.save(`soundcloud`, tokenData, userId);
    
    return tokenData
  },

  async downloadTracks(userId: string) {
    
    const tokenData = tokenStorage.get("soundcloud", userId);
    if (!tokenData) throw new Error("User not logged in");

    const res = await fetch(
      `https://api.soundcloud.com/me/tracks?oauth_token=${tokenData.token}`
    );
    return res.json();
  },

  async uploadTrack(userId: string, file: Express.Multer.File) {
    const tokenData = tokenStorage.get(`soundcloud`, userId);
    if (!tokenData) throw new Error("User not logged in");

    const formData = new FormData();
    formData.append("track[title]", file.originalname);
    formData.append("track[asset_data]", file.buffer, file.originalname);

    const res = await fetch(
      `https://api.soundcloud.com/tracks?oauth_token=${tokenData.token}`,
      { method: "POST", body: formData as any }
    );

    return res.json();
  },

  async logout(userId: string) {
    tokenStorage.remove(`soundcloud`, userId);
  },
};
