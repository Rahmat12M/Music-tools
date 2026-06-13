import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataCollection, type Action, type AuthState } from "@/index";

/**
 * Ein eigener Hook, um den Logout zu handeln. 
 * 
 * Der Hook ist abhaengig vom aktuellen Status des Logins. Ist der Status `checklogout`, wird der Logout ausgefuehrt.
 * Wurde erfolgreich ausgeloggt, wird ein Success zurueckgegeben.
 * 
 * @param state Der aktuelle Loggingzustand.
 * @param dispatch Die Reducerfunktion.
 */
export function useCheckLogout(
  state: AuthState,
  dispatch: React.ActionDispatch<[action: Action]>,
  setProvider: React.Dispatch<React.SetStateAction<string[]>>
) {
  const data = useContext(DataCollection);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.type !== "checklogout") return;

    fetch(data["/logout"], { credentials: "include" }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        setProvider([]);
        navigate("/");
      }
      dispatch({ type: "SUCCESS" });
    });
  }, [state.type]);
}
