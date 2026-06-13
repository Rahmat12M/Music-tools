import { useState, type ReactNode } from "react";
import { SongBrowserContext } from "./SongBrowserContext";
import { songLibrary } from "./songLibrary";
import type { SongLibraryType, SongMetadata } from "./type";
import { fileUpload } from "./helperFunctions"

export function SongBrowserProvider({ children }: { children: ReactNode }) {
  const [songLib, setSongLib] = useState<SongLibraryType[]>(songLibrary);

  /**
   * Die nach aussen hin sichtbare Funktion ueber den Kontext zum Upload von Dateien.
   * 
   * @param files 
   * @param provider 
   * @param metadata - Optional metadata to apply to the uploaded songs
   */
  function uploadFile(files: FileList, provider: string, metadata?: SongMetadata) {
    fileUpload(files, provider, songLib, setSongLib, metadata);
  }

  return (
    <SongBrowserContext.Provider value={{songLib, setSongLib, uploadFile}}>
      {children}
    </SongBrowserContext.Provider>
  );
}
