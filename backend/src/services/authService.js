// =============================================================
// src/services/authService.ts
// Service d'authentification : register, validateUser, login, getProfile
// Corrections :
//   - Ajout de validateUser() (manquante → crash login)
//   - Ajout de getProfile() (manquante → crash /auth/me)
//   - Import prisma corrigé (chemin sans espace)
// =============================================================
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js"; // ✅ Corrigé : chemin sans espace
let AuthService = class AuthService {
    /**
     * Inscription d'un nouvel utilisateur
     * Hache le mot de passe avant de l'enregistrer en base
     */
    async register(data) {
        const { nom, prenom, email, password } = data;
        // Vérifie si l'email est déjà utilisé
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("Email déjà utilisé");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crée l'utilisateur avec les champs alignés sur le schéma Prisma
        const user = await prisma.user.create({
            data: {
                nom, // ✅ Aligné avec schema.prisma
                prenom, // ✅ Aligné avec schema.prisma
                email,
                password: hashedPassword,
            },
        });
        // On ne retourne jamais le mot de passe au client
        const { password: _pwd, ...safeUser } = user;
        return safeUser;
    }
    /**
     * Vérifie les identifiants de connexion
     * Retourne l'utilisateur si valide, null sinon
     * ✅ Méthode manquante ajoutée
     */
    async validateUser(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return null;
        return user;
    }
    /**
     * Génère un JWT pour l'utilisateur authentifié
     */
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        const jwtSecret = process.env.JWT_SECRET || "CLE_SECRET_PAR_DEFAUT_A_REMPLACER";
        return {
            access_token: jwt.sign(payload, jwtSecret, { expiresIn: "1h" }),
        };
    }
    /**
     * Récupère le profil de l'utilisateur connecté à partir de son ID
     * ✅ Méthode manquante ajoutée
     */
    async getProfile(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("Utilisateur introuvable");
        }
        // On ne retourne jamais le mot de passe
        const { password: _pwd, ...safeUser } = user;
        return safeUser;
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=authService.js.map