import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PrismaService } from '../lib/prisma.service';

@ApiTags('Rôles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {

  constructor(private readonly prisma: PrismaService) {}

  @Post('become-organizer')
  @ApiOperation({ summary: "Devenir organisateur d'événements (JWT requis)" })
  async becomeOrganizer(@Req() req: Request, @Res() res: Response) {

    
    const userId = (req as any).user?.sub;

    if (!userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Accès refusé : token manquant ou invalide',
      });
    }

    try {
      const updatedUser = await this.prisma.db.user.update({
        where: { id: userId },
        data: { role: 'organizer' },
        select: { id: true, nom: true, prenom: true, email: true, role: true },
      });

      return res.status(HttpStatus.OK).json({
        message: 'Rôle mis à jour vers organisateur avec succès',
        user: updatedUser,
      });
    } catch (err: any) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erreur lors de la mise à jour : ' + err.message,
      });
    }
  }
}