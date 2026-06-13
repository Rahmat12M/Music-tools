import { createContext } from "react";
import type { SongBrowserContextType } from "./type";

/**
 * Der Kontext fuer den SongBrowser.
 * 
 * ### Bereitstellung folgender Parameter
 * 
 * - `songLib:` SongLibraryType[];
 * - `setSongLib:` React.Dispatch<React.SetStateAction<SongLibraryType[]>>;
 * - `uploadFile:` (files: FileList, provider: string) => void;
 */
export const SongBrowserContext = createContext<SongBrowserContextType | null>(null);
