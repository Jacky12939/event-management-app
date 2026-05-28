var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, UnauthorizedException, } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        // Gestion CORS preflight
        if (req.method === "OPTIONS") {
            return next();
        }
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Token manquant ou invalide");
        }
        const token = authHeader.split(" ")[1];
        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT_SECRET manquant dans le fichier .env");
            }
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
            next();
        }
        catch (err) {
            throw new UnauthorizedException("Token invalide ou expiré");
        }
    }
};
AuthMiddleware = __decorate([
    Injectable()
], AuthMiddleware);
export { AuthMiddleware };
//# sourceMappingURL=AuthMiddleware.js.map