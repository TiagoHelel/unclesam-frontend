import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  company: string;
  cnpj: string;
  email: string;
  active: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<boolean>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@DocLoad:token");
    const user = localStorage.getItem("@DocLoad:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("sessions", {
      email,
      password,
    });
    const { token, user } = response.data;

    if (!user.active) {
      return false;
    }

    localStorage.setItem("@DocLoad:token", token);
    localStorage.setItem("@DocLoad:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    return true;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@DocLoad:token");
    localStorage.removeItem("@DocLoad:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
      localStorage.removeItem("@DocLoad:user");
      localStorage.setItem("@DocLoad:user", JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
