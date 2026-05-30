import type { UserResponse } from "./auth.service";

export const authStorage = {
  storeSession: (token: string, user: UserResponse): void => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  getUser: (): UserResponse | null => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  updateUser: (user: UserResponse): void => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  clearSession: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};