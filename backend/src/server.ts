import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import providerRouter from "./integrations/providers/providerRouter";
import authRouter from "./integrations/login-user/authRouter";
import userRouter from "./integrations/login-user/userRouter";

// Application
const app = express();
// Fixe Ports, via ENV überschreibbar
const CLIENT_PORT: number = Number(process.env.CLIENT_PORT || 4400);
const SERVER_PORT: number = Number(process.env.PORT || 3000);
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || `http://localhost:${CLIENT_PORT}`;

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
//  SessionID via cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // localhost sin https
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
  })
);

//SERVER TEST

// Login fake (hardcode)
// app.post("/auth/login", (req, res) => {
//   const { username, password } = req.body as {
//     username?: string;
//     password?: string;
//   };

//   // mínim: usuario y pass hardcoded
//   if (username === "test" && password === "1234") {
//     (req.session as any).user = { username };
//     return res.json({ ok: true, user: (req.session as any).user });
//   }

//   return res.status(401).json({ ok: false, error: "Invalid credentials" });
// });

// // Autologin
// app.get("/auth/login", (req, res) => {
//   const user = (req.session as any).user;
//   if (!user) return res.status(401).json({ ok: false, user: null });
//   return res.json({ ok: true, user });
// });

// //  Logout
// app.post("/auth/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) return res.status(500).json({ ok: false });
//     res.clearCookie("sid");
//     return res.json({ ok: true });
//   });
// });

app.use(authRouter);
app.use(userRouter);
app.use(providerRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
