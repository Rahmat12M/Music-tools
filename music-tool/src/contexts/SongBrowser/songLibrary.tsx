import type { SongLibraryType } from "./type";
import { v4 as uuid } from "uuid";

// Song-Bibliothek: Array mit Song-Kollektionen, gruppiert nach Provider
// Jedes Objekt repräsentiert einen Provider mit seinen zugehörigen Songs
// Struktur:
// - provider: Name des Anbieters (Spotify, SoundCloud, Mixcloud)
// - color: Farbe für visuelle Identifikation (Dot, Genre-Badge)
// - songs: Array mit allen Songs dieses Providers vom Typ songType. Wichtig fuer Drag&Drop
//   - title: Song-Titel
//   - artist: Künstlername
//   - genre: Musikgenre
//   - tags: Technische Infos (Format, Bitrate, Status)
//   - date: Upload-/Veröffentlichungsdatum
export const songLibrary: SongLibraryType[] = [
  {
    provider: "Spotify",
    color: "#10b981", // Grün - Spotify-Brandfarbe
    songs: [
      {
        id: uuid(),
        title: "Midnight Echoes",
        artist: "Nova Lines",
        genre: "Pop",
        tags: ["WAV", "320 kbps"], // Hohe Qualität
        date: "Heute",
      },
      {
        id: uuid(),
        title: "City Lights",
        artist: "Lumen",
        genre: "Indie",
        tags: ["MP3", "Release"], // Veröffentlichter Track
        date: "Gestern",
      },
    ],
  },
  {
    provider: "SoundCloud",
    color: "#f97316", // Orange - SoundCloud-Brandfarbe
    songs: [
      {
        id: uuid(),
        title: "Orange Skies",
        artist: "Cloud Keys",
        genre: "Trance",
        tags: ["WAV", "Demo"], // Demo-Version
        date: "Gerade eben",
      },
      {
        id: uuid(),
        title: "Afterglow",
        artist: "Aria",
        genre: "House",
        tags: ["MP3", "Pre-Release"], // Vor-Veröffentlichung
        date: "Vor 2 Tagen",
      },
    ],
  },
  {
    provider: "Mixcloud",
    color: "#6366f1", // Indigo - Mixcloud-Brandfarbe
    songs: [
      {
        id: uuid(),
        title: "Late Night Show #21",
        artist: "DJ Faye",
        genre: "Elektronik/Techno",
        tags: ["Mix", "320 kbps"], // DJ-Mix in hoher Qualität
        date: "Letzte Woche",
      },
    ],
  },
];