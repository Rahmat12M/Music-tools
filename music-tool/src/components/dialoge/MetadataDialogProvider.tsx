import { useReducer, type ReactNode, useCallback, useContext } from "react";
import { MetadataDialogContext } from "./MetadataDialogContext";
import { SongBrowserContext } from "@/index";
import type { DialogState, AudioMetadata, MetadataDialogContextType } from "./types";

type DialogAction =
  | { type: "OPEN_DIALOG"; file: File; provider: string }
  | { type: "CLOSE_DIALOG" }
  | { type: "UPDATE_METADATA"; metadata: Partial<AudioMetadata> }
  | { type: "RESET_DIALOG" };

const initialState: DialogState = {
  isOpen: false,
  audioFile: null,
  provider: null,
  metadata: {
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    description: "",
  },
};

function dialogReducer(state: DialogState, action: DialogAction): DialogState {
  switch (action.type) {
    case "OPEN_DIALOG":
      return {
        ...state,
        isOpen: true,
        audioFile: action.file,
        provider: action.provider,
        metadata: {
          title: action.file.name.replace(/\.[^/.]+$/, ""),
          artist: "",
          genre: "",
          releaseDate: new Date().toISOString().split("T")[0],
          description: "",
        },
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isOpen: false,
      };
    case "UPDATE_METADATA":
      return {
        ...state,
        metadata: {
          ...state.metadata,
          ...action.metadata,
        },
      };
    case "RESET_DIALOG":
      return initialState;
    default:
      return state;
  }
}

/**
 * Provider-Komponente für den Metadaten-Dialog
 * Verwaltet den globalen State des Dialogs
 */
export function MetadataDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dialogState, dispatch] = useReducer(dialogReducer, initialState);
  const { uploadFile } = useContext(SongBrowserContext)!;

  const openDialog = useCallback((file: File, provider: string) => {
    dispatch({ type: "OPEN_DIALOG", file, provider });
  }, []);

  const closeDialog = useCallback(() => {
    dispatch({ type: "CLOSE_DIALOG" });
  }, []);

  const updateMetadata = useCallback((metadata: Partial<AudioMetadata>) => {
    dispatch({ type: "UPDATE_METADATA", metadata });
  }, []);

  const submitMetadata = useCallback(() => {
    // Konvertiere die Datei in ein FileList-ähnliches Objekt
    const dataTransfer = new DataTransfer();
    if (dialogState.audioFile) {
      dataTransfer.items.add(dialogState.audioFile);
    }
    
    // Konvertiere AudioMetadata zu SongMetadata Format
    const songMetadata = {
      title: dialogState.metadata.title,
      artist: dialogState.metadata.artist,
      genre: dialogState.metadata.genre,
      date: dialogState.metadata.releaseDate,
      description: dialogState.metadata.description,
    };
    
    // Rufe uploadFile mit den Metadaten auf
    uploadFile(dataTransfer.files, dialogState.provider!, songMetadata);
    
    console.log("Metadata submitted:", {
      file: dialogState.audioFile?.name,
      provider: dialogState.provider,
      metadata: songMetadata,
    });
    dispatch({ type: "RESET_DIALOG" });
  }, [dialogState.audioFile, dialogState.provider, dialogState.metadata, uploadFile]);

  const value: MetadataDialogContextType = {
    dialogState,
    openDialog,
    closeDialog,
    updateMetadata,
    submitMetadata,
  };

  return (
    <MetadataDialogContext.Provider value={value}>
      {children}
    </MetadataDialogContext.Provider>
  );
}
