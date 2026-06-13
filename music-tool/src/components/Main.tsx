import "./Main.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, Provider, SongBrowser } from "@/index";

function Main() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "AUTOLOGIN" });
  }, []);

  return (
    <div className="main-shell">
      <div className="main-header">
        <div>
          <h1>MUSICTOOL</h1>
          <p className="main-tagline">
            Verbinde Provider, lade hoch und halte alle Releases im Blick.
          </p>
        </div>
        <div className="main-actions">
          <button className="main-ghost" onClick={() => navigate("/upload")}> 
            Neuer Upload
          </button>
          <button className="main-ghost">Sync aktualisieren</button>
          <button className="main-ghost" onClick={() => dispatch({type: 'LOGOUT'})}>Logout</button>
        </div>
      </div>

      <div id="main">
        <Provider />
        <SongBrowser />
      </div>
    </div>
  );
}

export default Main;
