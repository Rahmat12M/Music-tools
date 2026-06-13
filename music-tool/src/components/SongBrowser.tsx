import { DraggableItem, SongBrowserContext, type SongType } from '@/index';
import { useContext } from 'react';
import { v4 as uuid } from "uuid";

// SongBrowser-Komponente: Zeigt eine Übersicht aller Songs gruppiert nach Provider
// Jeder Song wird mit Titel, Künstler, Genre, Tags und Datum angezeigt
function SongBrowser() {
  const { songLib, setSongLib } = useContext(SongBrowserContext)!;

  /**
   * 
   * @param provider 
   * @param song 
   * @returns 
   */
  function setNewSong(provider: string, song: SongType) {
    const newSong: SongType = {...song, id: uuid()};
    const newSongLibrary = structuredClone(songLib);
    const foundedLib = newSongLibrary.find((lib) => lib.provider.toLowerCase() === provider.toLowerCase());
    
    // Pruefen, ob der Song bereits im Zielprovider vorhanden ist.
    if (foundedLib?.songs.find((libSong) => {
      return (
        song.title === libSong.title
        && song.artist === libSong.artist
        && song.genre === libSong.genre
      )}) !== undefined) return;
    
    // Fuege den Song dem Zielprovider hinzu.
    foundedLib?.songs.push(newSong);
    setSongLib(newSongLibrary);
  }

  return (
    <div id="song-browser">
      {/* Hauptüberschrift der Song-Browser-Sektion */}
      <h2>Songs</h2>
      
      {/* Grid-Container: Zeigt Songs in responsivem Layout */}
      {/* auto-fit sorgt für automatische Anpassung der Spaltenanzahl */}
      <div className="song-grid">
        {/* Iteriere über alle Provider-Gruppen (Spotify, SoundCloud, Mixcloud) */}
        {songLib.map((bucket) => (
          // Song-Karte pro Provider: Container für alle Songs eines Providers
          // key: Eindeutige Identifikation über Provider-Name
          <div className="song-card" key={bucket.provider}>
            {/* Provider-Tag: Zeigt an, zu welchem Provider die Songs gehören */}
            <div className="song-provider-tag">
              {/* Farbiger Punkt (Dot) in Provider-Farbe zur visuellen Identifikation */}
              <span className="song-provider-dot" style={{ background: bucket.color }} />
              {/* Provider-Name (z.B. "Spotify", "SoundCloud") */}
              {bucket.provider}
            </div>
            
            {/* Iteriere über alle Songs des aktuellen Providers */}
            {bucket.songs.map((song) => (
              // Song-Container: Einzelner Song mit allen Details
              // key: Eindeutige Identifikation über Song-Titel
              <DraggableItem
                key={song.title}
                item={song}
                listItems={bucket.songs}
                setter={setNewSong}
              >
                <div key={song.title}>
                  {/* Song-Titel als Hauptüberschrift */}
                  <h3>{song.title}</h3>
                  
                  {/* Song-Metadaten: Künstler und Upload-Datum */}
                  {/* Format: "Künstler • Datum" (Bullet-Point als Trenner) */}
                  <p className="song-meta">{song.artist} • {song.date}</p>
                  
                  {/* Badge-Container: Genre und technische Tags */}
                  <div className="song-badges">
                    {/* Genre-Badge: Farblich hervorgehoben in Provider-Farbe */}
                    {/* Verwendet transparente Provider-Farbe für Hintergrund (16 = 10% Deckkraft) */}
                    {/* Border verwendet 20% Deckkraft (33 in Hex) */}
                    <span 
                      className="song-badge" 
                      style={{ 
                        background: bucket.color + "16", // Hex-Farbe + Alpha-Kanal
                        color: "#0b1021", 
                        border: `1px solid ${bucket.color}33` 
                      }}
                    >
                      {song.genre}
                    </span>
                    
                    {/* Technische Tags: Format, Bitrate, Status */}
                    {/* Iteriere über alle Tags des Songs (z.B. ["WAV", "320 kbps"]) */}
                    {song.tags.map((tag) => (
                      // Tag-Badge in neutralem Grau
                      // key: Eindeutige Identifikation über Tag-Text
                      <span className="song-badge" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </DraggableItem>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongBrowser;
