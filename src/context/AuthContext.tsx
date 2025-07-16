/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, DecodedToken, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp > currentTime) {
          const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
          setUser(storedUser);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post<{ token: string } & User>("/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    const loggedInUser = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
    };
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return res.data;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await axios.post<{ token: string } & User>(
      "/api/auth/register",
      {
        name,
        email,
        password,
      }
    );
    localStorage.setItem("token", res.data.token);
    const registeredUser = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
    };
    localStorage.setItem("user", JSON.stringify(registeredUser));
    setUser(registeredUser);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
