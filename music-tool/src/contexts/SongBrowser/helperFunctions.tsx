import type { SongLibraryType, SongType, SongMetadata } from "@/index";
import { v4 as uuid } from "uuid";

/**
 * Die Uploadfunktion aus dem Dateiexplorer. Diese wird vom SongBrowserProvider aufgerufen.
 * 
 * Es wird durch eine Liste von Songs aus dem Dateiexplorer iteriert und die Songs dem entsprechenden Provider
 * hinzugefuegt.
 * 
 * Die Metadaten der Songs werden dynamisch gesetzt. Einige Metadaten muessen ueber einen Dialog gesetzt werden.
 * 
 * Ist der Titel bereits in der Songliste des Providers, wird der Upload des Songs nicht vorgenommen.
 * 
 * 
 * @param files 
 * @param provider 
 * @param songLib 
 * @param setSongLib
 * @param metadata - Optional metadata to apply to the uploaded songs
 */
export function fileUpload(
  files: FileList,
  provider: string,
  songLib: SongLibraryType[],
  setSongLib: React.Dispatch<React.SetStateAction<SongLibraryType[]>>,
  metadata?: SongMetadata
) {
  console.log(`Drag n Drop File Explorer: `, files, " - ", provider, " - Metadata: ", metadata);
  const songTemplate: SongType = {
    artist: metadata?.artist || "",
    date: metadata?.date || "",
    genre: metadata?.genre || "",
    description: metadata?.description || "",
    id: "",
    tags: [],
    title: metadata?.title || "",
  };
  const newSongLib = structuredClone(songLib);
  const foundedLib = newSongLib.find(
    (lib) => lib.provider.toLowerCase() === provider.toLowerCase(),
  );

  for (const song of files) {
    console.log(`Aktueller Song: ${song.name} - ${song.type}`);
    const newSong: SongType = { ...songTemplate };
    // Wenn kein Titel in den Metadaten angegeben wurde, nutze den Dateinamen
    newSong.title = metadata?.title || song.name;
    newSong.id = uuid();
    newSong.tags = [song.type];
    // Wenn kein Datum in den Metadaten angegeben wurde, nutze "Heute"
    newSong.date = metadata?.date || "Heute";

    if (
      foundedLib?.songs.find((libSong) => {
        return libSong.title == newSong.title;
      }) !== undefined
    )
      continue;

    foundedLib?.songs.push(newSong);
    setSongLib(newSongLib);
  }
}
