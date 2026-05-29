import { useEffect, useState } from "react";
import api from "../services/api";

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "attendee" | "organizer";
}

interface LoginResponse {
  access_token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {

    const stored = localStorage.getItem("user");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    if (token) {
      api.get<User>("/auth/me")
        .then((res) => {
          if (isMounted) {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch(() => {
          if (isMounted) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      const timer = setTimeout(() => {
        if (isMounted) setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    return () => { isMounted = false; };
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // Obtenir le token
    const tokenResponse = await api.post<LoginResponse>("/auth/login", { email, password });
    const { access_token } = tokenResponse.data;
    localStorage.setItem("token", access_token);

    // Récupérer le profil complet
    const profileResponse = await api.get<User>("/auth/me");
    const loggedInUser = profileResponse.data;

    //  Stocker l'objet user dans localStorage
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setLoading(false);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, login, logout, loading };
}