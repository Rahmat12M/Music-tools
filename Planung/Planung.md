git# Planung

## Projektthema

> Das Projektthema legt fest, was die Anwendung machen soll, worum es geht und was alles moeglich sein soll.

### Brainstorming und sammeln von Vorschlaegen

- ~~Dokumentationtool als Webapplikation~~
- Musikmanagementtool um verschieden Anbieter zusammenzufuehren
    - API von Spotify recherchieren
    - API von Soundcloud recherchieren
    - Musik erstellt und auf allen Plattformen bereitgestellt.

## Lastenheft

> Das Lastenheft **beschreibt alle Anforderungen** des Projekts.
>
> <u>Es enthält typischerweise auch eine Priorisierung wie:</u>
> - Muss (Pflicht)
> - Kann (Optional)
> - Wunsch / Nice‑to‑have


### Musskriterien (Pflicht)
- Login
    - Benutzer und Password fuer den Login in unser Tool.
    - Session ID
    - Benutzer mit entsprechenden Anmeldedaten fuer jeden Anbieter
    - Passwoerter verschluesseln (Hash).

- Automatischer Login via SessionId

- Hochladen von Musik vom eigenen Rechner
    - Einzeln hochladen
    - Massenhochladen (mehrere Dateien auf einmal)
    - Dateien sammeln und dann verteilen (hochladen) auch auf mehrere Plattformen gleichzeigen via Uploadbutton
        - Es wird ein Dialog zur Verfuegung gestellt, wo die Uploaddateien gesammelt werden koennen und dann Auswahl der Anbieter und durch Buttonklick der Upload ausgefuehrt wird.
    - Alles auch per Drag & Drop
- Tausch zwischen den Anbietern per Drag & Drop
    - Musik von Spotify zu Soundcloud z.B.
- Abspielen von Music direkt aus unserer Plattform.

### Optional (Kann)
- Allgemeine Registrierung
- Adminrechte duerfen Benutzer loeschen.
- Der eigene Benutzer darf sich selbst loeschen.
- Rechteverwaltung
    - Leserechte
    - Admin
        - Einstellungen, wie Zugaenge zu den Anbietern (Spotify,...)
- Adminbereich fuer:
    - Zugangsdaten fuer eigenen Login
    - Zugangsdaten fuer Anbieterlogin
- Teilen mit anderen
    - Ich kann bestimmte Titel von jedem Anbieter fuer eine `bestimmte Zeit` anderen zur Verfuegung stellen
    - Nur sehen und hoeren und bei Berechtigung auch Download.
    - Teilen via `E-Mail` (oder WhatsApp, Telegramm) - Benutzerfremde. Schicke Werbungslink zum Anmeldebereich.
    - Teilen mit anderen Benutzern der Plattform
- Playlisten erstellen (Anbieteruebergreifend)
    - Teilen mit anderen Benutzern der Plattform

### Was waere schoen
- Animationen mit einbauen.
- Social Media Funktion, wie Folgen, Liken, Chat ...

## Design
- 

## Freie Musik zum Testen 

> Im Folgenden sind einige Verlinkungen zu Webseiten mit frei verfueglicher Musik zum testen.

hier gibt es kostenlose "royalte free music" https://pixabay.com/de/music/

und hier benötigt man einen account https://www.epidemicsound.com/

## Prototypen

### Drag & Drop 

- Es soll die Moeglichkeit geben, via Drag & Drop vom Fileexplorer und zwischen erlaubten Sektionen zu verschieben.
- Erstellung einer Komponente um einen Prototypen zu programmieren.
- Natives Drag & Drop von HTML 5 nutzen.
- Es soll so programmiert werden, dass es leicht erweiterbar und generell verfuegbar ist.

Beipielprogrammierung Drag & Drop zwischen zwei Sektionen (Divs)

### Backendteam:

**Aufgaben**

- Endpoint Login, Autologin, Middlewarepruefung auf Authentifizierung
- Userdatenbasis (json).

TODO: Endpunkte definieren und dokumentieren.

**Erledigt:**
- Login: POST /login
- Autologin: GET /login
- Middlewarepruefung
- Userbasis

> (Martin, Daniel)
<!-- ----- -->

- Endpoint Login/Logout Anbieter
    - Entsprechende Fetches fuer jeden Anbieter.
        - In eigene Hooks.
    - Middleware zur Pruefung, ob angemeldet
- Endpoint Logout pro Anbieter
- Endpoint fuer das Herunterladen der Daten (hochgeladene Musikstuecke) pro Anbieter
- Endpoint fuer das Hochladen von **eigenen** Musikstuecken.
- Recherche der Endpunkte fuer die jeweiligen Anbieter. (2 Anbieter)
- So umsetzen, dass ohne grossen Aufwand ein neuer Anbieter hinzugefuegt werden kann. (env Datei mit Zugangsdaten oder `json`).
- Endpunkte:
    - "/:provider/login"
    - "/:provider/callback"
    - "/:provider/upload"
    - "/:provider/download"

> (Brian, Rahmatulla)

### Recherche Anbieter
```js
import
```

<!--  -->
- `Flexibel halten`.
- Eine Liste mit Musikstuecken die erlaubt sind. (optional).
    - Pruefen, ob es eine Schnittstelle gibt, die prueft ob eine Musik lizenziert ist oder nicht.
    - Automatisches Pruefen via Middleware
- Testen via Postman
> (Enrico)



### Frontend:

- Routes
- Loginformular auf den definierten Endpunkt.
    - Am Anfang simulieren, bis der Endpunkt zur Verfuegung steht.
- Logout

TODO: Styling, Mit Endpunkten verbinden

> (Karleene, Sahar)

<!--  -->
- Die Ansicht fuer die Anbieter
    - Auflistung in einer eigenen Sektion
- Die Ansicht fuer die Musikstuecke
    - Auflistung in einer eigenen Sektion
- Autologin (D.h., pruefen via fetch, ob bereits eingeloggt.)

TODO: Drag & Drop 

> (Simon, Eric, Helmut)

<!--  -->
- Drag & Drop (Framework umgesetzt)
- Fileexplorer zu Anbieter.
- Design.

<!--  -->
### Backend - Frontend

- Server.ts aufbereiten bzgl. CORS, SessionID, package.json -> Scripte anpassen mit fixen Portnummern.

> (Jimmy, Matias)

# Schnittstellenbeschreibung

> Hier wird beschrieben, welche Endpunkte das Backend zur Verfuegung stellt und wie die aufgerufen werden und was zurueck kommt. Mit einem Beispiel untermauert.

> **TODO:** Tokenbehandlung. Via Cookie oder `speichern im Backend`. Beide Versionen und Testen, welches vorteilhafter ist.
> ***Erste Version Speichern im Backend in einer eigen JSON Datei.***

# Dialoge

> Ein kleines Frameword, das Dialoge anzeigt.

## Bedingungen

- Dynamisch, d.h. der Dialog wird aufgerufen und mitgegeben um was fuer einen Dialog es sich handelt.
    - Inofrmationsdialog (Schliessenbutton)
        - Schliessenbutton fix (keine Callbackfunktion)
    - Errordialog (Schliessenbutton)
        - Schliessenbutton fix (keine Callbackfunktion)
    - Warnungsdialog (Schliessenbutton)
        - Schliessenbutton fix (keine Callbackfunktion)
    - Individuellen Dialog (zwei Buttons)
        - Anzeige der Buttons individuell.
        - Jeder Button bekommt eine Callbackfunktion. Dadurch flexibel handhabbar.
        - Auch HTML moeglich.
    - Bei jedem Dialog ein Trigger, ob der Dialog automatisch schliesst.
    - Bei jedem Dialog ein individueller Text moeglich.

## Was fuer Dialoge brauchen wir?

- Dialog fuer Benutzerdaten. (Anzeige, Einstellungen)
    - Hier Backend erweitern, dass die Benutzerdaten angepasst werden koennen.
- Dialog fuer die Auswahl der Provider
    - Hier Backend erweitern, dass die Provider dem Benutzer zugeteilt werden.
- Errordialoge automatisch angezeigt bei entsprechendem Status vom Backend.
    - Koordination Frontend und Backend.

# Drag n Drop

- Erweiterung um Fileexplorer.
    - Dateien koennen via Drag n Drop vom Fileexplorer hinzugefuegt werden.

# Weiteres

- Button fuer manuelles Anmelden bei den Providern
    - Token wird im Cookie gespeichert.
    - Automatisches pruefen, welche Anbieter noch nicht angemeldet sind. Also keinen Token.
- Automatisches Anstossen der Anmeldung bei den Providern nach dem Login.
    - Falls kein Cookie mit dem Token vorhanden ist.
    - Ansonsten, wenn Token vorhanden, keine extra Anmeldung notwendig.
- Frontend mit dem Backend verbinden (Fetches).
    - 
- Upload aus dem Fileexplorer

# Teams:

> **Backend:** Brian, Rahmatullah, Martin, Daniel, Enrico
- Martin, Daniel: 
    - Errordialoge automatisch angezeigt bei entsprechendem Status vom Backend.
    - Dialog fuer Benutzerdaten. (Anzeige, Einstellungen)
Hier Backend erweitern, dass die Benutzerdaten angepasst werden koennen.
Koordination Frontend und Backend.
- Brian, Rahmatullah: 
    - Dialog fuer die Auswahl der Provider
Hier Backend erweitern, dass die Provider dem Benutzer zugeteilt werden.
    - Erledigt ✔️
        - Login und Autologin geben folgendes Zurueck:
            - Status
            - [Provider1, Provider2, ...]
    - Button fuer manuelles Anmelden bei den Providern
Token wird im Cookie gespeichert.
Automatisches pruefen, welche Anbieter noch nicht angemeldet sind. Also keinen Token.
Automatisches Anstossen der Anmeldung bei den Providern nach dem Login.
Falls kein Cookie mit dem Token vorhanden ist.
Ansonsten, wenn Token vorhanden, keine extra Anmeldung notwendig.


> Login auf bpsw. spotify: klickt button, meldet sich an dann handleCallback gibt token zurück. pusht providernamen bei dem angemeldet wurde zu user.provider sowie die userID von bei dem beispiel spotify zu user.providerUserID

> **Frontend:** Helmut, Simon, Sahar, Karlene, Enrico

### Enrico

**In Arbeit:** Drag n Drop vom Dateiexplorer.

### Simon
#### Dialoge im Dateiexplorer integriert
- Audiodatei per drag & drop in Anbieter geschoben, öffnet sich ein Dialoge indem Titel, Künstler, Genre, Release-Datum und Beschreigung hinzugefügt oder angepasst werden kann

- **In Arbeit** Genre-Auswahl im Dialoge als dropdown menü anzeigen