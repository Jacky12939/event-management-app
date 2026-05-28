var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Req, Res, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"; // <-- Chemin d'import corrigé
let RolesController = class RolesController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Ajout des types précis : Request et Response
    async becomeOrganizer(req, res) {
        // Utilisation d'un cast 'as any' temporaire sur req pour accéder à .user sans erreur TypeScript
        const userId = req.user?.sub || "id_de_test_temporaire";
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { role: "organizer" },
            });
            return res
                .status(HttpStatus.OK)
                .json({ message: "Rôle mis à jour vers organisateur" });
        }
        catch (err) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: err.message });
        }
    }
};
__decorate([
    Post("become-organizer"),
    ApiOperation({ summary: "Devenir organisateur d'événements" })
    // Ajout des types précis : Request et Response
    ,
    __param(0, Req()),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "becomeOrganizer", null);
RolesController = __decorate([
    ApiTags("Rôles"),
    ApiBearerAuth(),
    Controller("roles"),
    __metadata("design:paramtypes", [Object])
], RolesController);
export { RolesController };
//# sourceMappingURL=roles.js.map