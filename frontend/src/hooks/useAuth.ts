
import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  //  hydrate user depuis localStorage (JWT existant)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    setUser(user);

    return user;
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, register, logout };
}