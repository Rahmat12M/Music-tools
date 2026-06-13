import { useContext } from "react";
import { MetadataDialogContext } from "./MetadataDialogContext";

/**
 * Hook zum Zugriff auf den Metadaten-Dialog-Context
 * Muss innerhalb eines MetadataDialogProvider verwendet werden
 */
export function useMetadataDialog() {
  const context = useContext(MetadataDialogContext);
  
  if (!context) {
    throw new Error(
      "useMetadataDialog muss innerhalb eines MetadataDialogProvider verwendet werden"
    );
  }
  
  return context;
}
