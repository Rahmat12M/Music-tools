import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { DragDropProvider } from "@/index";


// import { AuthProvider } from "./authentifizierung/AuthContext.jsx"; 


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DragDropProvider>
      <App />
    </DragDropProvider>
  </StrictMode>
);

