import type { Action, AuthState } from "@/index";

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
export function reducer(state: AuthState, action: Action): AuthState {

  switch (state.type) {
    case "loggedout":
      if (action.type === "LOGIN") return {type: "checklogin", login: 'userlogin', loginData: action.loginData};
      if (action.type === "AUTOLOGIN") {
        return {type: "checklogin", login: 'autologin'};
      }
      break;
    case "loggedin":
      if (action.type === "LOGOUT") return {type: 'checklogout'};
      break;
    case "checklogin":
      if (action.type === "SUCCESS") return {type: "loggedin"};
      if (action.type === "ERROR" && action.msg.length === 0) return {type: "loggedout"};
      if (action.type === "ERROR" && action.msg.length > 0) return {type: "error", msg: action.msg}
      break;
    case "checklogout":
      if (action.type === 'SUCCESS') return {type: "loggedout"};
      break;
    case 'error':
      if (action.type === 'CLEAR') return {type: 'loggedout'}
      break;
  }
  
  return state;
}
