// =============================================================
// src/services/authService.ts
// Service d'authentification : register, validateUser, login, getProfile
// Corrections :
//   - Ajout de validateUser() (manquante → crash login)
//   - Ajout de getProfile() (manquante → crash /auth/me)
//   - Import prisma corrigé (chemin sans espace)
// =============================================================

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import prisma from '../lib/prisma'; // ✅ Corrigé : chemin sans espace

@Injectable()
export class AuthService {

  /**
   * Inscription d'un nouvel utilisateur
   * Hache le mot de passe avant de l'enregistrer en base
   */
  async register(data: any) {
    const { nom, prenom, email, password } = data;

    // Vérifie si l'email est déjà utilisé
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée l'utilisateur avec les champs alignés sur le schéma Prisma
    const user = await prisma.user.create({
      data: {
        nom,     // ✅ Aligné avec schema.prisma
        prenom,  // ✅ Aligné avec schema.prisma
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
  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  /**
   * Génère un JWT pour l'utilisateur authentifié
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    const jwtSecret: string =
      process.env.JWT_SECRET || 'CLE_SECRET_PAR_DEFAUT_A_REMPLACER';

    return {
      access_token: jwt.sign(payload, jwtSecret, { expiresIn: '1h' }),
    };
  }

  /**
   * Récupère le profil de l'utilisateur connecté à partir de son ID
   * ✅ Méthode manquante ajoutée
   */
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    // On ne retourne jamais le mot de passe
    const { password: _pwd, ...safeUser } = user;
    return safeUser;
  }
}