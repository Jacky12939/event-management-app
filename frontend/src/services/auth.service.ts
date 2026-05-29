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

export interface AuthResponse {
  access_token: string;
}

export interface UserResponse {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "attendee" | "organizer";
  createdAt: string;
  updatedAt: string;
}

export interface RegisterResponse {
  message: string;
  user: UserResponse;
}

export interface RoleUpdateResponse {
  message: string;
  user?: UserResponse;
}

export const register = async (userData: RegisterData): Promise<RegisterResponse> => {
  const { nom, prenom, email, password } = userData;
  const response = await api.post<RegisterResponse>("/auth/register", {
    nom, prenom, email, password,
  });
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

// Le JWT est envoyé automatiquement par l'intercepteur axios
export const becomeOrganizer = async (): Promise<RoleUpdateResponse> => {
  const response = await api.post<RoleUpdateResponse>("/roles/become-organizer");
  return response.data;
};