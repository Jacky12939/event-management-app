import { AuthService } from "../services/authService.js";
import type { Request } from "express";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    /**
     * POST /auth/register
     * Inscription d'un nouvel utilisateur
     */
    register(body: any): Promise<{
        message: string;
        user: {
            id: string;
            nom: string;
            prenom: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    /**
     * POST /auth/login
     * Connexion et obtention du JWT
     */
    login(body: any): Promise<{
        access_token: string;
    }>;
    /**
     * GET /auth/me
     * Retourne le profil de l'utilisateur connecté (JWT requis)
     */
    getProfile(req: Request): Promise<{
        id: string;
        nom: string;
        prenom: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=auth.d.ts.map