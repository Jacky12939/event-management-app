export declare class AuthService {
    /**
     * Inscription d'un nouvel utilisateur
     * Hache le mot de passe avant de l'enregistrer en base
     */
    register(data: any): Promise<{
        id: string;
        nom: string;
        prenom: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Vérifie les identifiants de connexion
     * Retourne l'utilisateur si valide, null sinon
     * ✅ Méthode manquante ajoutée
     */
    validateUser(email: string, password: string): Promise<{
        id: string;
        nom: string;
        prenom: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    /**
     * Génère un JWT pour l'utilisateur authentifié
     */
    login(user: any): Promise<{
        access_token: string;
    }>;
    /**
     * Récupère le profil de l'utilisateur connecté à partir de son ID
     * ✅ Méthode manquante ajoutée
     */
    getProfile(userId: string): Promise<{
        id: string;
        nom: string;
        prenom: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=authService.d.ts.map