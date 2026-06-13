import { createContext } from "react";
import type { MetadataDialogContextType } from "./types";

/**
 * Context für die Verwaltung des Metadaten-Dialog-States
 * Wird vom MetadataDialogProvider bereitgestellt
 */
export const MetadataDialogContext = createContext<MetadataDialogContextType | undefined>(undefined);
