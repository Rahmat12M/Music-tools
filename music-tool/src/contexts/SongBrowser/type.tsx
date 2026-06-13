import type { DragItem } from "@/index";

export interface SongType extends DragItem {
  title: string;
  artist: string;
  genre: string;
  tags: string[];
  date: string;
  description?: string;
}

export type SongLibraryType = {
  provider: string;
  color: string;
  songs: SongType[];
};

export interface SongMetadata {
  title?: string;
  artist?: string;
  genre?: string;
  date?: string;
  description?: string;
}

export type SongBrowserContextType = {
  songLib: SongLibraryType[],
  setSongLib: React.Dispatch<React.SetStateAction<SongLibraryType[]>>,
  uploadFile: (files: FileList, provider: string, metadata?: SongMetadata) => void
}
