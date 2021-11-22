import Router from "next/router";
import { setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
interface SignInData {
  email: string;
  password: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated: boolean = !!user;

  async function signIn({ email, password }: SignInData) {
    const { data } = await api.post("/login", { email, password });
    setCookie(undefined, "w16:token", data.token, { maxAge: 60 * 60 * 1 });
    api.defaults.headers['Authorization'] = `Bearer ${data.token}`
    setUser(data.user);
    Router.push("/cidade");
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
