# Server-Dokumentation (CORS, Session, Ports, Routen)

## Ziel
- Stabiler Serverstart mit festen Ports.
- React-Frontend darf Cookies nutzen (Session) und ohne Reload mit dem Backend sprechen.
- Erweiterbar ohne Codebrüche (Open/Closed Principle) über ENV und modularen Router.

## Konfiguration (Ports & Origin)
- `PORT` (Backend-Port): Standard `3000`.
- `CLIENT_PORT` (Frontend-Port): Standard `4400`.
- `FRONTEND_ORIGIN`: Standard `http://localhost:${CLIENT_PORT}`.
- `SESSION_SECRET`: Geheimnis für die Session-Signatur (in DEV Fallback `dev-secret`).

Diese Werte können per Umgebungsvariablen gesetzt werden, ohne Code zu ändern.

## Middleware
- `express.urlencoded({ extended: true })`: Form-/Body-Parsing (URL-encoded).
- `cors({ origin: FRONTEND_ORIGIN, credentials: true })`: Erlaubt exakt eine Origin und lässt Cookies zu.
- `express.json()`: JSON-Body-Parsing.
- `cookie-parser()`: Liest Cookies aus eingehenden Requests.
- `express-session(...)`:
	- Cookie-Name: `sid`.
	- Cookie-Optionen: `httpOnly`, `sameSite: 'lax'`, `secure: false` (für localhost), `maxAge: 1 Tag`.
	- `resave: false`, `saveUninitialized: false`.

Hinweis für das Frontend: Bei `fetch` zwingend `credentials: 'include'` setzen, damit `sid` gesendet wird.

## Auth-Routen (einfacher Test-Flow)
- `POST /auth/login`: Prüft Hardcoded-Login (`username: "test"`, `password: "1234"`), legt `req.session.user` an und gibt `{ ok: true, user }` zurück.
- `GET /auth/login` (Autologin): Gibt den aktuellen User aus der Session zurück oder 401.
- `POST /auth/logout`: Zerstört die Session, löscht Cookie `sid`, gibt `{ ok: true }` zurück.

Diese Routen sind nur für Tests/Prototyping gedacht.

## Integrationen (Provider)
- Router-Mount: `app.use('/integrations/providers', providerRouter)`.
- Bestehende Provider-Endpunkte werden unter diesem Pfad bedient.

## Starten
- Entwicklung (mit Watch):
```
cd backend
npm run dev
```
- Produktion/ohne Watch:
```
cd backend
npm run start
```

Die Scripts setzen feste Default-Ports und `FRONTEND_ORIGIN`. Bei abweichenden Ports (z. B. React auf 5173) können ENV-Variablen beim Start überschrieben werden:
```
PORT=3000 CLIENT_PORT=5173 FRONTEND_ORIGIN=http://localhost:5173 npm run dev
```

## Tests
- Server erreichbar:
```
curl -i http://localhost:3000/
```
- Login testen (setzt Session):
```
curl -i -H 'Content-Type: application/json' \
	-d '{"username":"test","password":"1234"}' \
	http://localhost:3000/auth/login
```
- Session prüfen (mit Cookie weiterreichen): In Tools/Browser mit `credentials: 'include'` arbeiten.

## Open/Closed Principle
- Konfiguration (Ports/Origin/Secrets) über ENV statt Codeänderungen.
- Provider-Integration über eigenen Router modular angebunden. Neue Provider erfordern keine Änderungen am Server-Grundgerüst.