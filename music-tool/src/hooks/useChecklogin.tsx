import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataCollection, type Action, type AuthState } from "@/index";

/**
 * Ein eigener Hook, um zu pruefen, ob eingeloggt ist.
 * 
 * Props: Logging Reducer (State Machine)
 */
export function useCheckLogin(
  state: AuthState,
  dispatch: React.ActionDispatch<[action: Action]>,
  setProvider: React.Dispatch<React.SetStateAction<string[]>>
) {
  const navigate = useNavigate();
  const localtion = useLocation();
  const data = useContext(DataCollection);

  /**
   * Der automatische Login, wenn bereits vorher gueltig eingeloggt wurde.
   * 
   * Es wird ein Fetch an den Endpunkt /api/login mit der Methode GET ausgefuehrt.
   * Wird der Status 202 zurueckgegeben, so wird an die Route `/main` weitergeleitet
   * Ansonsten wird nichts unternommen.
   */
  useEffect(() => {
    if (
      state.type !== "checklogin" ||
      (state.type === "checklogin" && state.login !== "autologin")
    )
      return;

    fetch(data["/login"], {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      if (response.status === 202) {
        const provider: string[] = await response.json();
        setProvider(provider);
        console.log("Login erfolgreich. Weiterleitung: ", provider);
        dispatch({ type: "SUCCESS" });
        console.log(`new State (loggedin): ${state}`);
      } else {
        dispatch({ type: "ERROR", msg: '' });
        console.log(`new State (loggedout): ${state}`);
        if (localtion.pathname !== "/") navigate("/");
      }
    });
  }, [state]);

  /**
   * Der Fetch fuer den normalen Login mit den Benutzerdaten.
   */
  useEffect(() => {
    if (
      state.type !== "checklogin" ||
      (state.type === "checklogin" && state.login !== "userlogin")
    )
      return;

    //Login ausfuehren im Backend.
    const payload = {
      username: state.loginData.username,
      password: state.loginData.password
    }

    // Fetch.
    fetch(state.loginData.endpoint, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (response) => {
      if (response.status === 202) {
        const provider: string[] = await response.json();
        setProvider(provider);
        console.log('loggedin: ', provider);
        dispatch({type: 'SUCCESS'});
      } else if (response.status === 401) {
        console.log('error');
        dispatch({type: 'ERROR', msg: 'Falsche Eingaben!'});
      } else {
        console.log('error')
        dispatch({type: 'ERROR', msg: 'Felhler beim Login '});
      }
    });
  }, [state]);
}
