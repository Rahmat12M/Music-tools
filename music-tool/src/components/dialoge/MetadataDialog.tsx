import "./MetadataDialog.css";
import { useMetadataDialog } from "./useMetadataDialog";

/**
 * Dynamischer Dialog für die Eingabe von Audio-Metadaten
 * Wird angezeigt, nachdem eine Audio-Datei per Drag-Drop auf einen Provider gezogen wurde
 */
export function MetadataDialog() {
  const { dialogState, closeDialog, updateMetadata, submitMetadata } =
    useMetadataDialog();

  if (!dialogState.isOpen) {
    return null;
  }

  const { audioFile, provider, metadata } = dialogState;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMetadata();
  };

  return (
    <div className="metadata-dialog-overlay" onClick={closeDialog}>
      <div
        className="metadata-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Header */}
        <div className="metadata-dialog-header">
          <h2>Audio-Metadaten bearbeiten</h2>
          <button
            className="metadata-dialog-close"
            onClick={closeDialog}
            aria-label="Dialog schließen"
          >
            ✕
          </button>
        </div>

        {/* Dialog Content */}
        <div className="metadata-dialog-content">
          {/* Datei-Info */}
          <div className="metadata-file-info">
            <div className="metadata-file-info-label">Datei:</div>
            <div className="metadata-file-info-value">
              {audioFile?.name}
            </div>
            <div className="metadata-file-info-label" style={{ marginTop: "8px" }}>
              Provider:
            </div>
            <div className="metadata-file-info-value">{provider}</div>
          </div>

          {/* Metadaten-Formular */}
          <form onSubmit={handleSubmit}>
            {/* Track-Titel */}
            <div className="metadata-form-group">
              <label htmlFor="title">Track-Titel *</label>
              <input
                id="title"
                type="text"
                value={metadata.title}
                onChange={(e) => updateMetadata({ title: e.target.value })}
                placeholder="z.B. Summer Vibes"
                required
              />
            </div>

            {/* Künstler und Genre in einer Reihe */}
            <div className="metadata-form-row">
              <div className="metadata-form-group">
                <label htmlFor="artist">Künstler *</label>
                <input
                  id="artist"
                  type="text"
                  value={metadata.artist}
                  onChange={(e) => updateMetadata({ artist: e.target.value })}
                  placeholder="z.B. Max Mustermann"
                  required
                />
              </div>

              <div className="metadata-form-group">
                <label htmlFor="genre">Genre *</label>
                <input
                  id="genre"
                  type="text"
                  value={metadata.genre}
                  onChange={(e) => updateMetadata({ genre: e.target.value })}
                  placeholder="z.B. Electronic"
                  required
                />
              </div>
            </div>

            {/* Release-Datum */}
            <div className="metadata-form-group">
              <label htmlFor="releaseDate">Release-Datum</label>
              <input
                id="releaseDate"
                type="date"
                value={metadata.releaseDate}
                onChange={(e) => updateMetadata({ releaseDate: e.target.value })}
              />
            </div>

            {/* Beschreibung */}
            <div className="metadata-form-group">
              <label htmlFor="description">Beschreibung</label>
              <textarea
                id="description"
                value={metadata.description}
                onChange={(e) => updateMetadata({ description: e.target.value })}
                placeholder="Geben Sie eine Beschreibung des Tracks ein..."
              />
            </div>

            {/* Dialog Footer mit Buttons */}
            <div className="metadata-dialog-footer">
              <button
                type="button"
                className="metadata-btn metadata-btn-secondary"
                onClick={closeDialog}
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="metadata-btn metadata-btn-primary"
              >
                Speichern & Hochladen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
