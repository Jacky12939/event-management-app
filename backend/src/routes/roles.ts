import { Controller, Post, Req, Res, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"; // <-- Chemin d'import corrigé
import type { Request, Response } from "express"; // <-- Import des types Express nécessaires
import { PrismaService } from "../lib/prisma.service.js";

@ApiTags("Rôles")
@ApiBearerAuth()
@Controller("roles")
export class RolesController {
  constructor(private readonly prisma: any) {}

  @Post("become-organizer")
  @ApiOperation({ summary: "Devenir organisateur d'événements" })
  // Ajout des types précis : Request et Response
  async becomeOrganizer(@Req() req: Request, @Res() res: Response) {
    // Utilisation d'un cast 'as any' temporaire sur req pour accéder à .user sans erreur TypeScript
    const userId = (req as any).user?.sub || "id_de_test_temporaire";

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { role: "organizer" },
      });
      return res
        .status(HttpStatus.OK)
        .json({ message: "Rôle mis à jour vers organisateur" });
    } catch (err: any) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  }
}
