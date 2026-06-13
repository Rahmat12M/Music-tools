import { useReducer, useState, type ReactNode } from "react";
import { reducer } from "./authReducer";
import { AuthContext, useCheckLogin, useCheckLogout } from "@/index";

export function AuthProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(reducer, {type: 'loggedout'});
  const [provider, setProvider] = useState<string[]>([]);

  useCheckLogin(state, dispatch, setProvider);
  useCheckLogout(state, dispatch, setProvider);  

  return (
    <>
      <AuthContext.Provider value={{state, dispatch, provider, setProvider}}>{children}</AuthContext.Provider>
    </>
  );
}