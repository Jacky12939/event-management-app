var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, RequestMethod, } from "@nestjs/common";
import { AuthService } from "./services/authService.js"; // 💡 Ajuste le chemin vers ton service s'il est ailleurs
import { AuthController } from "./routes/auth.js";
import { AuthMiddleware } from "./middleware/AuthMiddleware.js";
import { EventsModule } from "./events/events.module.js";
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(AuthMiddleware)
            // 💡 On protège toute l'application sauf l'inscription et la connexion
            .exclude({ path: "auth/register", method: RequestMethod.POST }, { path: "auth/login", method: RequestMethod.POST })
            .forRoutes("*");
    }
};
AppModule = __decorate([
    Module({
        imports: [EventsModule], // Laisse tes autres modules ici (ex: TypeOrmModule, ConfigModule) si tu en as
        controllers: [AuthController], // Ton AuthController est déclaré ici directement
        providers: [AuthService], // Ton AuthService est déclaré ici directement
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map