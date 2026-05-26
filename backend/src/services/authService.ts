import { Injectable } from '@nestjs/common';
 // adapte le chemin
import * as bcrypt from 'bcrypt';
import prisma from '../lib/ prisma';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  async register(data: any) {
    const { nom, prenom, email, password } = data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    const jwtSecret: string =
      process.env.JWT_SECRET || 'CLE_SECRET_PAR_DEFAUT_A_REMPLACER';

    return {
      access_token: jwt.sign(payload, jwtSecret, { expiresIn: '1h' }),
    };
  }
}