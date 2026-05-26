import api from "./api";

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Typage précis pour la réponse du Login
export interface AuthResponse {
  access_token: string;
}

// Typage précis pour la réponse de l'Inscription (Register)
export interface UserResponse {
  id: string;
  name: string;
  firstname: string;
  email: string;
  role: "attendee" | "organizer";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  user: UserResponse;
}

// Typage pour la réponse du changement de rôle
export interface RoleUpdateResponse {
  message: string;
}

// ==========================================
// 🚀 SERVICES D'APPELS API TYPÉS
// ==========================================

/**
 * Inscription d'un nouvel utilisateur
 */
export const register = async (userData: RegisterData): Promise<RegisterResponse> => {
  const { nom, prenom, email, password } = userData;
  
  const response = await api.post<RegisterResponse>("/auth/register", {
    nom,
    prenom,
    email,
    password
  });

  return response.data;
};

/**
 * Connexion de l'utilisateur
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

/**
 * Passage du rôle de l'utilisateur connecté à "organizer"
 */
export const becomeOrganizer = async (): Promise<RoleUpdateResponse> => {
  const response = await api.post<RoleUpdateResponse>("/roles/become-organizer");
  return response.data;
};