export interface MusicProvider {
  name: string;

  /** Gibt die URL zurück, zu der der User weitergeleitet wird */
  getAuthUrl(): string;

  /** Bearbeitet den Callback mit Authorization Code */
  handleCallback(code: string): Promise<{access_token:string}>;

  /** Meldet den User ab */
  logout(userId: string): Promise<void>;

  /** Lädt die Tracks / Daten des Users herunter */
  downloadTracks(userId: string): Promise<any[]>;

  /** Optional: Upload eines Tracks */
  uploadTrack?(userId: string, file: any): Promise<void>;
}
