
import { MusicProvider } from '../MusicProvider';
import { tokenStorage } from '../tokenStorage';



export const spotifyProvider: MusicProvider = {
  name: 'spotify',

  getAuthUrl() {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID!,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      scope: 'user-read-private user-read-email'
    });
    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  },

  async handleCallback(code: string) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!
      })
    });

    const tokenData = await response.json();
    const accessToken = tokenData.access_token;
    //==========================================
    const userRes = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken }
  });
  const userData = await userRes.json();
  const userId = userData.id.toString();
  //===============================================
  tokenStorage.save(`spotify`, userId, tokenData);
  
return tokenData;
  },

  async downloadTracks(userId: string) {
    const tokenData = tokenStorage.get(`spotify`, userId);
    if (!tokenData) throw new Error('User not logged in');

    const res = await fetch('https://api.spotify.com/v1/me/tracks', {
      headers: { Authorization: 'Bearer ' + tokenData.token }
    });

    return res.json();
  },

  async logout(userId: string) {
    tokenStorage.remove(`spotify`, userId);
  }
};
