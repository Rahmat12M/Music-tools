import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

interface FileMetadata {
  title: string;
  artist: string;
  genre: string;
  releaseDate: string;
  description: string;
}

interface UploadProps {
  onNavigateBack?: () => void;
}

function Upload({ onNavigateBack }: UploadProps) {
  const navigate = useNavigate();
  const MAX_FILES = 10;
  const [selectedProvider, setSelectedProvider] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [metadata, setMetadata] = useState<Record<number, FileMetadata>>({});

  const providers = [
    { id: "spotify", name: "Spotify", color: "#10b981" },
    { id: "soundcloud", name: "SoundCloud", color: "#f97316" },
    { id: "mixcloud", name: "Mixcloud", color: "#6366f1" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      const totalFiles = uploadedFiles.length + newFiles.length;
      
      if (totalFiles > MAX_FILES) {
        alert(`Maximal ${MAX_FILES} Dateien erlaubt. Du versuchst ${totalFiles} Dateien hochzuladen.`);
        const allowedCount = MAX_FILES - uploadedFiles.length;
        if (allowedCount > 0) {
          const filesToAdd = newFiles.slice(0, allowedCount);
          const updatedFiles = [...uploadedFiles, ...filesToAdd];
          setUploadedFiles(updatedFiles);
          addMetadataForNewFiles(filesToAdd, uploadedFiles.length);
        }
      } else {
        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);
        addMetadataForNewFiles(newFiles, uploadedFiles.length);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      if (newFiles.length > MAX_FILES) {
        alert(`Maximal ${MAX_FILES} Dateien erlaubt. Nur die ersten ${MAX_FILES} werden hinzugefügt.`);
        const filesToAdd = newFiles.slice(0, MAX_FILES);
        setUploadedFiles(filesToAdd);
        initializeMetadata(filesToAdd);
      } else {
        setUploadedFiles(newFiles);
        initializeMetadata(newFiles);
      }
    }
  };

  const initializeMetadata = (files: File[]) => {
    const newMetadata: Record<number, FileMetadata> = {};
    files.forEach((file, idx) => {
      newMetadata[idx] = {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "",
        genre: "Pop",
        releaseDate: "",
        description: "",
      };
    });
    setMetadata(newMetadata);
  };

  const handleAddMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = uploadedFiles.length + newFiles.length;
      
      if (totalFiles > MAX_FILES) {
        alert(`Maximal ${MAX_FILES} Dateien erlaubt. Du hast bereits ${uploadedFiles.length} Datei(en).`);
        const allowedCount = MAX_FILES - uploadedFiles.length;
        if (allowedCount > 0) {
          const filesToAdd = newFiles.slice(0, allowedCount);
          const updatedFiles = [...uploadedFiles, ...filesToAdd];
          setUploadedFiles(updatedFiles);
          addMetadataForNewFiles(filesToAdd, uploadedFiles.length);
        }
      } else {
        const updatedFiles = [...uploadedFiles, ...newFiles];
        setUploadedFiles(updatedFiles);
        addMetadataForNewFiles(newFiles, uploadedFiles.length);
      }
    }
    e.target.value = '';
  };

  const addMetadataForNewFiles = (newFiles: File[], startIndex: number) => {
    const newMetadata = { ...metadata };
    newFiles.forEach((file, idx) => {
      newMetadata[startIndex + idx] = {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "",
        genre: "Pop",
        releaseDate: "",
        description: "",
      };
    });
    setMetadata(newMetadata);
  };

  const toggleProvider = (id: string) => {
    setSelectedProvider((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const updateMetadata = (index: number, field: keyof FileMetadata, value: string) => {
    setMetadata((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value,
      },
    }));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setMetadata((prev) => {
      const newMetadata = { ...prev };
      delete newMetadata[index];
      // Reindex remaining metadata
      const reindexed: Record<number, FileMetadata> = {};
      Object.keys(newMetadata)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((oldIndex, newIndex) => {
          if (oldIndex > index) {
            reindexed[newIndex] = newMetadata[oldIndex];
          } else {
            reindexed[oldIndex] = newMetadata[oldIndex];
          }
        });
      return reindexed;
    });
  };

  return (
    <div className="upload-shell">
      <div className="upload-header">
        <div>
          <h1>Neuer Upload</h1>
          <p className="upload-tagline">
            Lade deine Musik hoch und verteile sie auf deine gewählten Anbieter.
          </p>
        </div>
        <div className="upload-actions">
          <button
            className="upload-ghost"
            onClick={() => (onNavigateBack ? onNavigateBack() : navigate("/main"))}
          >
            Zurück
          </button>
          <button className="upload-primary">Hochladen starten</button>
        </div>
      </div>

      {/* Upload-Content: Haupt-Container für alle Upload-Sektionen */}
      <div className="upload-content">
        {/* Drag & Drop Zone: Sektion zum Hochladen von Dateien */}
        <div className="upload-section">
          <h2>Datei auswählen</h2>
          
          {/* Dropzone: Interaktiver Bereich für Drag & Drop und File-Input */}
          {/* Dynamische CSS-Klassen: */}
          {/* - "active": Wenn Dateien darüber gezogen werden (dragActive = true) */}
          {/* - "has-files": Wenn bereits Dateien hochgeladen wurden */}
          <div
            className={`upload-dropzone ${dragActive ? "active" : ""} ${
              uploadedFiles.length > 0 ? "has-files" : ""
            }`}
            onDragEnter={handleDrag}  // Aktiviert beim Eintritt in die Zone
            onDragLeave={handleDrag}  // Deaktiviert beim Verlassen der Zone
            onDragOver={handleDrag}   // Hält Drag-Status während des Schwebens
            onDrop={handleDrop}       // Verarbeitet abgelegte Dateien
          >
            {/* Bedingtes Rendering: Zeige verschiedene Inhalte je nach Upload-Status */}
            {uploadedFiles.length === 0 ? (
              // Leerer Zustand: Keine Dateien hochgeladen - zeige Upload-Aufforderung
              <>
                {/* Ordner-Icon als visueller Hinweis */}
                <div className="upload-icon">📁</div>
                
                {/* Haupt-Anweisung: Drag & Drop */}
                <p className="upload-drop-text">
                  Ziehe deine Musikdateien hierher
                </p>
                
                {/* Trenn-Text zwischen Drag & Drop und File-Browser */}
                <p className="upload-drop-subtext">oder</p>
                
                {/* File-Input Button: Alternative zu Drag & Drop */}
                {/* Label fungiert als Button, input ist versteckt */}
                <label className="upload-file-button">
                  Durchsuchen
                  <input
                    type="file"
                    multiple              // Erlaubt Mehrfachauswahl
                    accept="audio/*"     // Nur Audio-Dateien erlaubt
                    onChange={handleFileInput}  // Handler für erste Dateiauswahl
                    style={{ display: "none" }}  // Versteckt natives Input-Element
                  />
                </label>
                
                {/* Info-Text: Unterstützte Formate und Größenlimit */}
                <p className="upload-formats">MP3, WAV, FLAC, AAC bis 500 MB</p>
              </>
            ) : (
              // Dateien vorhanden: Zeige Liste der hochgeladenen Dateien
              <div className="upload-file-list">
                {/* Iteriere über alle hochgeladenen Dateien */}
                {uploadedFiles.map((file, idx) => (
                  // Datei-Item: Zeigt Dateiname, Größe und Löschen-Button
                  // key: Index als eindeutige Identifikation
                  <div key={idx} className="upload-file-item">
                    {/* Musik-Icon für Audio-Dateien */}
                    <span className="upload-file-icon">🎵</span>
                    
                    {/* Datei-Informationen: Name und Größe */}
                    <div className="upload-file-info">
                      {/* Dateiname wie vom Betriebssystem */}
                      <p className="upload-file-name">{file.name}</p>
                      
                      {/* Dateigröße: Konvertiert Bytes zu MB mit 2 Dezimalstellen */}
                      {/* Formel: Bytes / 1024 / 1024 = Megabytes */}
                      <p className="upload-file-size">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    
                    {/* Löschen-Button: Entfernt Datei aus der Liste */}
                    <button
                      className="upload-file-remove"
                      onClick={() => removeFile(idx)}  // Ruft removeFile mit Index auf
                    >
                      ✕  {/* X-Symbol zum Löschen */}
                    </button>
                  </div>
                ))}
                
                {/* "Weitere Dateien hinzufügen" Button - nur wenn Limit nicht erreicht */}
                {/* Bedingung: uploadedFiles.length < MAX_FILES (weniger als 10 Dateien) */}
                {uploadedFiles.length < MAX_FILES && (
                  <label className="upload-add-more">
                    {/* Button-Text mit Zähler (z.B. "3/10") */}
                    + Weitere Dateien hinzufügen ({uploadedFiles.length}/{MAX_FILES})
                    <input
                      type="file"
                      multiple                  // Mehrfachauswahl erlaubt
                      accept="audio/*"         // Nur Audio-Dateien
                      onChange={handleAddMoreFiles}  // Handler für zusätzliche Dateien
                      style={{ display: "none" }}    // Versteckt natives Input
                    />
                  </label>
                )}
                
                {/* Limit-Warnung: Zeige Meldung wenn 10 Dateien erreicht sind */}
                {/* Bedingung: uploadedFiles.length >= MAX_FILES */}
                {uploadedFiles.length >= MAX_FILES && (
                  <p className="upload-limit-reached">
                    Maximale Anzahl von {MAX_FILES} Dateien erreicht
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Provider Selection: Sektion zur Auswahl der Upload-Zielplattformen */}
        <div className="upload-section">
          <h2>Anbieter auswählen</h2>
          
          {/* Beschreibung der Provider-Auswahl */}
          <p className="upload-section-desc">
            Wähle die Plattformen aus, auf die deine Songs hochgeladen werden
            sollen.
          </p>
          
          {/* Provider-Grid: Zeigt alle Provider in einem Grid-Layout */}
          <div className="upload-provider-grid">
            {/* Iteriere über alle verfügbaren Provider (Spotify, SoundCloud, Mixcloud) */}
            {providers.map((provider) => (
              // Provider-Karte: Klickbar, zeigt Auswahlstatus durch CSS-Klasse "selected"
              // key: Eindeutige Identifikation über provider.id
              <div
                key={provider.id}
                className={`upload-provider-card ${
                  selectedProvider.includes(provider.id) ? "selected" : ""
                }`}
                onClick={() => toggleProvider(provider.id)}  // Toggle-Funktion beim Klick
              >
                {/* Checkbox-Indikator: Visuelles Feedback der Auswahl */}
                {/* Farbe ändert sich basierend auf Auswahlstatus */}
                <div
                  className="upload-provider-check"
                  style={{
                    // Border-Farbe: Provider-Farbe wenn ausgewählt, sonst neutral grau
                    borderColor: selectedProvider.includes(provider.id)
                      ? provider.color
                      : "#d7ddf0",
                    // Hintergrund: Provider-Farbe wenn ausgewählt, sonst transparent
                    background: selectedProvider.includes(provider.id)
                      ? provider.color
                      : "transparent",
                  }}
                >
                  {/* Häkchen-Symbol: Nur sichtbar wenn Provider ausgewählt ist */}
                  {selectedProvider.includes(provider.id) && "✓"}
                </div>
                
                {/* Provider-Name unterhalb der Checkbox */}
                <p className="upload-provider-name">{provider.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata Form: Sektion für Metadaten-Eingabe */}
        {/* Bedingtes Rendering: Nur sichtbar wenn Dateien hochgeladen wurden */}
        {uploadedFiles.length > 0 && (
          <div className="upload-section">
            {/* Überschrift mit Datei-Zähler (Singular/Plural-Grammatik) */}
            <h2>Metadaten ({uploadedFiles.length} {uploadedFiles.length === 1 ? 'Datei' : 'Dateien'})</h2>
            
            {/* Beschreibung der Metadaten-Eingabe */}
            <p className="upload-section-desc">
              Fülle die Metadaten für jede Datei aus.
            </p>
            
            {/* Container für alle Metadaten-Karten */}
            <div className="upload-metadata-list">
              {/* Iteriere über alle hochgeladenen Dateien */}
              {/* Jede Datei erhält ihr eigenes Formular */}
              {uploadedFiles.map((file, idx) => (
                // Metadaten-Karte: Enthält alle Felder für eine Datei
                // key: Index als eindeutige Identifikation
                <div key={idx} className="upload-metadata-card">
                  {/* Karten-Header: Zeigt Dateinummer und Dateiname */}
                  <div className="upload-metadata-header">
                    {/* Nummerierungs-Badge: #1, #2, #3, etc. */}
                    <span className="upload-metadata-number">#{idx + 1}</span>
                    
                    {/* Dateiname als Überschrift */}
                    <h3 className="upload-metadata-filename">{file.name}</h3>
                  </div>
                  
                  {/* Formular mit allen Metadaten-Feldern */}
                  <div className="upload-form">
                    {/* Feld: Track-Titel */}
                    <div className="upload-field">
                      <label>Track-Titel</label>
                      <input
                        type="text"
                        placeholder="z.B. Midnight Dreams"
                        value={metadata[idx]?.title || ""}  // Liest Wert aus metadata-State
                        onChange={(e) => updateMetadata(idx, "title", e.target.value)}  // Aktualisiert bei Änderung
                      />
                    </div>
                    
                    {/* Feld: Künstlername */}
                    <div className="upload-field">
                      <label>Künstler</label>
                      <input
                        type="text"
                        placeholder="z.B. DJ Nova"
                        value={metadata[idx]?.artist || ""}  // Liest Wert aus metadata-State
                        onChange={(e) => updateMetadata(idx, "artist", e.target.value)}  // Aktualisiert bei Änderung
                      />
                    </div>
                    
                    {/* Feld-Gruppe: Genre und Release-Datum nebeneinander */}
                    <div className="upload-field-group">
                      {/* Feld: Genre (Dropdown) */}
                      <div className="upload-field">
                        <label>Genre</label>
                        <select
                          value={metadata[idx]?.genre || "Pop"}  // Standard: "Pop"
                          onChange={(e) => updateMetadata(idx, "genre", e.target.value)}  // Aktualisiert bei Auswahl
                        >
                          {/* Genre-Optionen: Alphabetisch sortiert */}
                          <option>Ambient</option>
                          <option>Deep House</option>
                          <option>Elektronik</option>
                          <option>Hip-Hop</option>
                          <option>House</option>
                          <option>Jazz</option>
                          <option>Klassik</option>
                          <option>Lofi</option>
                          <option>Nu Jazz</option>
                          <option>Pop</option>
                          <option>Psy-Trance</option>
                          <option>Rock</option>
                          <option>Techno</option>
                          <option>Trance</option>
                        </select>
                      </div>
                      
                      {/* Feld: Release-Datum (Datepicker) */}
                      <div className="upload-field">
                        <label>Release-Datum</label>
                        <input
                          type="date"  // Natives Browser-Datepicker
                          value={metadata[idx]?.releaseDate || ""}  // Liest Datum aus metadata-State
                          onChange={(e) => updateMetadata(idx, "releaseDate", e.target.value)}  // Aktualisiert bei Änderung
                        />
                      </div>
                    </div>
                    
                    {/* Feld: Beschreibung (Optional, mehrzeilig) */}
                    <div className="upload-field">
                      <label>Beschreibung (optional)</label>
                      <textarea
                        rows={3}  // 3 Zeilen Höhe
                        placeholder="Erzähle deiner Community etwas über deinen Track..."
                        value={metadata[idx]?.description || ""}  // Liest Wert aus metadata-State
                        onChange={(e) => updateMetadata(idx, "description", e.target.value)}  // Aktualisiert bei Änderung
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
