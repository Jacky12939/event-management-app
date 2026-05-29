
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import prisma from '../lib/prisma'; 

@Injectable()
export class AuthService {

  /**
   * Inscription d'un nouvel utilisateur
   * Hache le mot de passe avant de l'enregistrer en base
   */
  async register(data: any) {
    const { nom, prenom, email, password } = data;

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
        nom,     
        prenom, 
        email,
        password: hashedPassword,
      },
    });

    const { password: _pwd, ...safeUser } = user;
    return safeUser;
  }

  /**
   * Vérifie les identifiants de connexion
   * Retourne l'utilisateur si valide, null sinon
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
   */
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const { password: _pwd, ...safeUser } = user;
    return safeUser;
  }
}