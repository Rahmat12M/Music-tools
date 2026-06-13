/**
 * Typen für den Metadaten-Dialog
 */

export interface AudioMetadata {
  title: string;
  artist: string;
  genre: string;
  releaseDate: string;
  description: string;
}

export interface DialogState {
  isOpen: boolean;
  audioFile: File | null;
  provider: string | null;
  metadata: AudioMetadata;
}

export interface MetadataDialogContextType {
  dialogState: DialogState;
  openDialog: (file: File, provider: string) => void;
  closeDialog: () => void;
  updateMetadata: (metadata: Partial<AudioMetadata>) => void;
  submitMetadata: () => void;
}
