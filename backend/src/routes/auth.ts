import { Controller, Post, Get, Body, Req, HttpStatus, HttpCode, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AuthService } from '../services/authService'; 
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger'; 
import { Request } from 'express';

@ApiTags('Authentification') 
@Controller('auth') 
export class AuthController { 
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // 💡 Définit le status 201 automatiquement
  @ApiOperation({ summary: "Inscription d'un nouvel utilisateur" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'jacky@example.com' },
        password: { type: 'string', example: 'MonMotDePasse123' },
        nom: { type: 'string', example: 'Giresse' },
        prenom: { type: 'string', example: 'Jacky' }
      }
    }
  })
  async register(@Body() body: any) {
    try {
      const newUser = await this.authService.register(body);
      // 💡 Tu retournes juste l'objet, NestJS s'occupe du JSON et du CORS !
      return { 
        message: 'Compte créé avec succès',
        user: newUser 
      };
    } catch (err: any) {
      // 💡 Utiliser les exceptions NestJS permet au filtre global CORS de fonctionner en cas d'erreur
      throw new BadRequestException(err.message);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // 💡 Un POST renvoie 201 par défaut, on force le 200 pour le login
  @ApiOperation({ summary: "Connexion de l'utilisateur" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'jacky@example.com' },
        password: { type: 'string', example: 'MonMotDePasse123' }
      }
    }
  })
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return this.authService.login(user);
  }

  @Get('me')
  @ApiBearerAuth() 
  @ApiOperation({ summary: "Récupérer le profil de l'utilisateur connecté" })
  async getProfile(@Req() req: Request) {
    try {
      const userId = (req as any).user?.sub;
      
      if (!userId) {
        throw new UnauthorizedException("Accès refusé : Jeton d'authentification manquant ou invalide");
      }

      return await this.authService.getProfile(userId);
    } catch (err: any) {
      throw new NotFoundException(err.message);
    }
  }
}