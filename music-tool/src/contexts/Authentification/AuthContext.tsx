import { createContext } from "react";
import type { AuthContextType } from "./types";

const initialContext: AuthContextType = {
  state: { type: "loggedout" },
  dispatch: () => {},
  provider: [],
  setProvider: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialContext);
