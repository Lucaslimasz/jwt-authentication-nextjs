import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

interface AuthContextData {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>; // promise pelo fato de ser async
}

interface SignInData {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  avatar_url: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User>({} as User);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    // chamada api
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1, //1 hour
    });

    setUser(user);

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
