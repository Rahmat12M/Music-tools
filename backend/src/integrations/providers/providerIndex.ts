import { spotifyProvider } from "./spotify/spotify.provider";
import { soundcloudProvider } from "./soundcloud/soundcloud.provider";

export const providers = {
    spotify: spotifyProvider,
    soundcloud: soundcloudProvider
}