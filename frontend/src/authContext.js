import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  login: () => {},
  loginGoogle: () => {},
  logout: () => {},
  username: null,
  userID: null,
});
