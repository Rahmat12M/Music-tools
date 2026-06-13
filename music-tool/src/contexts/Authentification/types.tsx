export type AuthState =
  | { type: "loggedin" | "loggedout" | 'checklogout' }
  | { type: 'checklogin', login: 'autologin'}
  | { type: 'checklogin', login: 'userlogin', loginData: LoginData}
  | { type: "error", msg: string };

export type LoginData = {
  username: string,
  password: string,
  endpoint: string
};

export type Action =
  | { type: "LOGOUT" | "AUTOLOGIN" | "SUCCESS" | 'CLEAR'}
  | { type: "LOGIN", loginData: LoginData }
  | { type: 'ERROR', msg: string };

export type AuthContextType = {
  state: AuthState;
  dispatch: React.ActionDispatch<[action: Action]>;
  provider: string[];
  setProvider: React.Dispatch<React.SetStateAction<string[]>>;
};
