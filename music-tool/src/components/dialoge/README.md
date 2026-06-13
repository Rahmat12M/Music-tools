# Metadaten-Dialog Dokumentation

## Übersicht

Der Metadaten-Dialog ist eine dynamische React-Komponente, die automatisch angezeigt wird, wenn ein Benutzer eine Audio-Datei per Drag-Drop auf einen Provider-Card auf der Hauptseite zieht. Der Dialog ermöglicht es dem Benutzer, wichtige Metadaten wie Track-Titel, Künstler, Genre, Release-Datum und Beschreibung einzugeben, bevor die Datei hochgeladen wird.

## Dateien

### Dialog-Komponenten (`/src/components/dialoge/`)

1. **types.tsx**
   - Definiert TypeScript-Interfaces für:
     - `AudioMetadata`: Struktur der Audio-Metadaten
     - `DialogState`: State des Dialogs
     - `MetadataDialogContextType`: Context-Typ

2. **MetadataDialogContext.tsx**
   - Erstellt den React Context für den Dialog
   - Zentrale Verwaltung des Dialog-States

3. **MetadataDialogProvider.tsx**
   - Provider-Komponente für globalen State-Management
   - Verwendet `useReducer` für State-Updates
   - Integriert mit `SongBrowserContext` zum Upload der Datei

4. **useMetadataDialog.tsx**
   - Custom Hook für einfachen Zugriff auf Dialog-Funktionen
   - Wirft Fehler, wenn außerhalb von `MetadataDialogProvider` verwendet

5. **MetadataDialog.tsx**
   - Haupt-UI-Komponente des Dialogs
   - Zeigt Formular mit Eingabefeldern an
   - Responsive Design für Desktop und Mobile

6. **MetadataDialog.css**
   - Styling für den Dialog
   - Animationen für Öffnen/Schließen
   - Responsive Breakpoints für kleine Bildschirme

7. **index.tsx**
   - Zentrale Export-Datei für alle Dialog-Komponenten

## Workflow

### Benutzerinteraktion

```
1. Benutzer zieht Audio-Datei auf Provider-Card
2. Dialog wird automatisch geöffnet
3. Dateiname wird als Track-Titel vorausgefüllt
4. Release-Datum wird auf heutiges Datum gesetzt
5. Benutzer füllt Metadaten aus
6. Dialog speichern → Datei wird hochgeladen
```

### State-Management

Der Dialog verwendet einen `useReducer` Hook mit folgenden Aktionen:

- `OPEN_DIALOG`: Öffnet den Dialog mit Datei und Provider
- `CLOSE_DIALOG`: Schließt den Dialog (ohne zu speichern)
- `UPDATE_METADATA`: Aktualisiert einzelne Metadaten
- `RESET_DIALOG`: Setzt Dialog auf Initialzustand zurück

## Integration

### Voraussetzungen

1. Der `MetadataDialogProvider` muss in der App-Hierarchie oberhalb sein:
   ```tsx
   <MetadataDialogProvider>
     <App />
   </MetadataDialogProvider>
   ```

2. Die `MetadataDialog` Komponente muss in der App platziert werden:
   ```tsx
   <MetadataDialog />
   ```

### Verwendung im Code

#### Dialog öffnen (aus Provider.tsx):
```tsx
const { openDialog } = useMetadataDialog();

callbackFileDrop={(files: FileList) => {
  if (files.length > 0) {
    openDialog(files[0], provider.id);
  }
}}
```

#### Dialog-Hook verwenden:
```tsx
const { 
  dialogState,      // Aktueller State
  openDialog,       // Dialog öffnen
  closeDialog,      // Dialog schließen
  updateMetadata,   // Metadaten aktualisieren
  submitMetadata    // Speichern und Dialog schließen
} = useMetadataDialog();
```

## Formularfelder

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|-------------|-------------|
| Track-Titel | Text | Ja | Name des Audio-Tracks |
| Künstler | Text | Ja | Name des Künstlers |
| Genre | Text | Ja | Musikgenre |
| Release-Datum | Datum | Nein | Veröffentlichungsdatum |
| Beschreibung | TextArea | Nein | Detaillierte Beschreibung |

## Styling

Der Dialog ist responsive und passt sich an verschiedene Bildschirmgrößen an:

- **Desktop**: Maximale Breite 600px, zentriert
- **Tablet**: 90% der Bildschirmbreite
- **Mobile**: 95% der Bildschirmbreite, reduzierte Padding

### CSS-Klassen

- `.metadata-dialog-overlay`: Dunkler Hintergrund
- `.metadata-dialog`: Dialog-Container
- `.metadata-dialog-header`: Titel und Close-Button
- `.metadata-dialog-content`: Formularinhalte
- `.metadata-form-group`: Einzelnes Formularfeld
- `.metadata-form-row`: Zweispaltige Feldreihe
- `.metadata-dialog-footer`: Action-Buttons

## Zukünftige Verbesserungen

Mögliche Erweiterungen:

1. **Automatische Metadaten-Extraktion**: ID3-Tags aus Musikdateien auslesen
2. **Album-Art**: Hochladen von Album-Covers
3. **Playlist-Zuordnung**: Dialog zur Zuordnung zu Playlists
4. **Validierung**: Erweiterte Formularvalidierung mit Fehlermeldungen
5. **Speichern unter Entwürfe**: Metadaten temporär speichern
6. **Multi-File-Upload**: Mehrere Dateien gleichzeitig hochladen

## Fehlerbehandlung

Wenn `useMetadataDialog()` außerhalb von `MetadataDialogProvider` verwendet wird:
```
Error: useMetadataDialog muss innerhalb eines MetadataDialogProvider 
verwendet werden
```

Stelle sicher, dass der Provider in der App-Hierarchie korrekt positioniert ist.
