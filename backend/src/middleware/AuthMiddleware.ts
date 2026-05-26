import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    
    // 1. Sécurité pour le CORS : On laisse passer la requête OPTIONS
    if (req.method === 'OPTIONS') {
      return next();
    }

    // 2. Récupération du header d'autorisation
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException("Accès refusé : Jeton d'authentification manquant ou invalide");
    }

    // 3. Extraction du Token
    const token = authHeader.split(' ')[1];

    try {
      // 💡 FORCE LE TYPE : On extrait la clé et on ajoute "as string" à la fin.
      // Cela dit explicitement à TypeScript : "Fais-moi confiance, ce sera une string".
      const jwtSecret = (process.env.JWT_SECRET || 'CLE_SECRET_PAR_DEFAUT_A_REMPLACER') as string;

      // 4. La fonction acceptera la clé sans aucune plainte de TypeScript
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      // 5. On injecte les infos utilisateur décodées dans la requête
      (req as any).user = decoded;
      
      next();
    } catch (err) {
      throw new UnauthorizedException('Jeton invalide ou expiré');
    }
  }
}