import { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  firstname: string;
  email: string;
  role: string;
}

interface LoginResponse {
  access_token: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Sécurité pour éviter les fuites de mémoire sur les composants démontés
    const token = localStorage.getItem("token");

    if (token) {
      api.get<User>("/auth/me")
        .then((res) => {
          if (isMounted) {
            setUser(res.data);
          }
        })
        .catch(() => {
          if (isMounted) {
            localStorage.removeItem("token");
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false); // S'exécute de manière asynchrone après le retour de l'API
          }
        });
    } else {
      // 🎯 CORRECTION : Utilisation de setTimeout pour basculer l'état au cycle d'événement suivant
      // Cela évite de bloquer ou de forcer un rendu en cascade pendant le montage initial
      const timer = setTimeout(() => {
        if (isMounted) {
          setLoading(false);
        }
      }, 0);

      return () => clearTimeout(timer);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    const { access_token } = response.data;

    localStorage.setItem("token", access_token);

    const profileResponse = await api.get<User>("/auth/me");
    const loggedInUser = profileResponse.data;

    setUser(loggedInUser);
    setLoading(false);
    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout, loading };
}