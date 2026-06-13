import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, DropZone, useMetadataDialog } from "@/index";

type ProviderMeta = {
  id: string;
  name: string;
  desc: string;
  statusColor: string;
  accent: string;
  baseMeter: number;
};

type ProviderBehavior = {
  useCount: number;
  lastUsed: number;
};

const PROVIDER_BEHAVIOR_KEY = "providerBehavior";
const PROVIDER_IDS_KEY = "providerIds";

const providerCatalog: Record<string, ProviderMeta> = {
  spotify: {
    id: "spotify",
    name: "Spotify",
    desc: "Streaming & Editorial Playlists",
    statusColor: "#10b981",
    accent: "linear-gradient(135deg, #c2fbd7, #e1ffee)",
    baseMeter: 78,
  },
  soundcloud: {
    id: "soundcloud",
    name: "SoundCloud",
    desc: "Community Uploads & Fan Support",
    statusColor: "#f97316",
    accent: "linear-gradient(135deg, #ffe8d5, #fff3e6)",
    baseMeter: 62,
  },
  mixcloud: {
    id: "mixcloud",
    name: "Mixcloud",
    desc: "Shows, Radios & Podcasts",
    statusColor: "#6366f1",
    accent: "linear-gradient(135deg, #e3e7ff, #eef0ff)",
    baseMeter: 70,
  },
};

const fallbackProviderMeta = (id: string): ProviderMeta => {
  const title = id
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    id,
    name: title,
    desc: "Provider mit Backend-Daten",
    statusColor: "#64748b",
    accent: "linear-gradient(135deg, #e2e8f0, #f8fafc)",
    baseMeter: 55,
  };
};

const loadProviderIds = (): string[] => {
  if (typeof window === "undefined") {
    return Object.keys(providerCatalog);
  }

  try {
    const raw = window.localStorage.getItem(PROVIDER_IDS_KEY);
    if (!raw) {
      return Object.keys(providerCatalog);
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is string => typeof id === "string");
    }
  } catch {
    return Object.keys(providerCatalog);
  }

  return Object.keys(providerCatalog);
};

const loadBehavior = (): Record<string, ProviderBehavior> => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PROVIDER_BEHAVIOR_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as Record<string, ProviderBehavior>;
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
  } catch {
    return {};
  }

  return {};
};

const saveBehavior = (behavior: Record<string, ProviderBehavior>) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PROVIDER_BEHAVIOR_KEY, JSON.stringify(behavior));
  } catch {
    // Ignore write errors (e.g. private mode)
  }
};

// Provider-Komponente: Zeigt eine Liste der verfügbaren Musik-Anbieter
// Jeder Anbieter hat einen Namen, Beschreibung, Status-Farbe und Fortschrittsbalken
function Provider() {
  const {provider} = useContext(AuthContext);
  const { openDialog } = useMetadataDialog();
  const navigate = useNavigate();

  /*const [availableProviderIds, setAvailableProviderIds] = useState<string[]>(
    () => loadProviderIds()
  );*/
  const [behavior, setBehavior] = useState<Record<string, ProviderBehavior>>(
    () => loadBehavior()
  );

  /*useEffect(() => {
    // Placeholder: später durch Backend-Provider-IDs ersetzen.
    setAvailableProviderIds(loadProviderIds());
  }, []);*/

  const recordUse = (providerId: string) => {
    setBehavior((prev) => {
      const next: Record<string, ProviderBehavior> = {
        ...prev,
        [providerId]: {
          useCount: (prev[providerId]?.useCount ?? 0) + 1,
          lastUsed: Date.now(),
        },
      };
      saveBehavior(next);
      return next;
    });
  };

  const providers = useMemo(() => {
    const ids = provider.length > 0 ? provider : Object.keys(providerCatalog);

    return ids
      .map((id) => {
        const meta = providerCatalog[id] ?? fallbackProviderMeta(id);
        const userBehavior = behavior[id] ?? { useCount: 0, lastUsed: 0 };
        const meter = Math.min(100, Math.max(5, meta.baseMeter + userBehavior.useCount * 4));

        return {
          ...meta,
          meter,
          useCount: userBehavior.useCount,
          lastUsed: userBehavior.lastUsed,
        };
      })
      .sort((a, b) => {
        if (b.useCount !== a.useCount) {
          return b.useCount - a.useCount;
        }
        if (b.lastUsed !== a.lastUsed) {
          return b.lastUsed - a.lastUsed;
        }
        return a.name.localeCompare(b.name);
      });
  }, [behavior, provider]);

  return (
    <div id="provider">
      {/* Überschrift der Provider-Sektion */}
      <h2>Anbieter</h2>
      
      {/* Untertitel mit Erklärung der Sektion */}
      <p className="provider-subtitle">
        Wähle einen Anbieter aus, um Uploads und Syncs zu verwalten.
      </p>
      
      {/* Container für die Liste aller Provider-Karten */}
      <div className="provider-list">
        {/* Iteriere über alle Provider und erstelle für jeden eine Karte */}
        {providers.map((provider) => (
          <DropZone
            key={provider.id}
            id={provider.id}
            callbackDrop={(item, listItems, setter) => {
              console.log(`Drop to ${provider.id} - item: `, item, ' - ', listItems);
              setter(provider.id, item);
              recordUse(provider.id);
            }}
            callbackFileDrop={(files: FileList) => {
              // Öffne den Dialog für die erste Datei
              if (files.length > 0) {
                recordUse(provider.id);
                openDialog(files[0], provider.id);
              }
            }}
          >
            <div className="provider-card" key={provider.id}>
              {/* Provider-Icon: Zeigt die ersten 2 Buchstaben des Provider-Namens */}
              {/* Hintergrund ist der individuelle Gradient des Providers */}
              <div
                className="provider-icon"
                style={{
                  background: provider.accent,
                }}
              >
                {/* Extrahiere erste 2 Buchstaben und wandle in Großbuchstaben um */}
                {/* z.B. "Spotify" -> "SP", "SoundCloud" -> "SO" */}
                {provider.name.slice(0, 2).toUpperCase()}
              </div>
              
              {/* Provider-Kopfzeile: Enthält Name und Status-Badge */}
              <div className="provider-head">
                {/* Provider-Name als Hauptüberschrift der Karte */}
                <p className="provider-name">{provider.name}</p>
              </div>
              
              {/* Beschreibung: Erklärt die Hauptfunktion des Providers */}
              <p className="provider-desc">{provider.desc}</p>
              
              {/* Fortschrittsbalken: Zeigt Upload/Sync-Status visuell */}
              <div className="provider-meter">
                {/* Farbiger Balken, Breite entspricht dem meter-Wert (in Prozent) */}
                {/* z.B. meter: 84 -> width: 84% */}
                <span
                  style={{
                    background: provider.statusColor,
                    width: `${provider.meter}%`,
                  }}
                />
              </div>
              
              {/* Aktionsbuttons für den Provider */}
              <div className="provider-actions">
                {/* Primärer Button: Öffnet Upload-Übersicht für diesen Provider */}
                <button
                  className="provider-button"
                  onClick={() => {
                    recordUse(provider.id);
                    navigate("/upload");
                  }}
                >
                  Uploads öffnen
                </button>
                
                {/* Sekundärer Button: Öffnet Provider-Einstellungen */}
                <button className="provider-button secondary">
                  Einstellungen
                </button>
              </div>
            </div>
          </DropZone>
        ))}
      </div>
    </div>
  );
}

export default Provider;
