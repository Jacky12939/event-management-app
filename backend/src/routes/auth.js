// =============================================================
// src/routes/auth.ts
// Contrôleur d'authentification NestJS
// Ce fichier était correct — aucune modification nécessaire
// =============================================================
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
import { Controller, Post, Get, Body, Req, HttpStatus, HttpCode, BadRequestException, UnauthorizedException, NotFoundException, } from "@nestjs/common";
import { AuthService } from "../services/authService.js";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    /**
     * POST /auth/register
     * Inscription d'un nouvel utilisateur
     */
    async register(body) {
        try {
            const newUser = await this.authService.register(body);
            return {
                message: "Compte créé avec succès",
                user: newUser,
            };
        }
        catch (err) {
            throw new BadRequestException(err.message);
        }
    }
    /**
     * POST /auth/login
     * Connexion et obtention du JWT
     */
    async login(body) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException("Email ou mot de passe incorrect");
        }
        return this.authService.login(user);
    }
    /**
     * GET /auth/me
     * Retourne le profil de l'utilisateur connecté (JWT requis)
     */
    async getProfile(req) {
        try {
            const userId = req.user?.sub;
            if (!userId) {
                throw new UnauthorizedException("Accès refusé : token manquant ou invalide");
            }
            return await this.authService.getProfile(userId);
        }
        catch (err) {
            throw new NotFoundException(err.message);
        }
    }
};
__decorate([
    Post("register"),
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ summary: "Inscription d'un nouvel utilisateur" }),
    ApiBody({
        schema: {
            type: "object",
            properties: {
                email: { type: "string", example: "jacky@example.com" },
                password: { type: "string", example: "MonMotDePasse123!" },
                nom: { type: "string", example: "Giresse" },
                prenom: { type: "string", example: "Jacky" },
            },
        },
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post("login"),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: "Connexion de l'utilisateur" }),
    ApiBody({
        schema: {
            type: "object",
            properties: {
                email: { type: "string", example: "jacky@example.com" },
                password: { type: "string", example: "MonMotDePasse123!" },
            },
        },
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Get("me"),
    ApiBearerAuth(),
    ApiOperation({ summary: "Récupérer le profil de l'utilisateur connecté" }),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    ApiTags("Authentification"),
    Controller("auth"),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.js.map