import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";

import { AuthService } from "./services/authService.js"; // 💡 Ajuste le chemin vers ton service s'il est ailleurs
import { AuthController } from "./routes/auth.js";
import { AuthMiddleware } from "./middleware/AuthMiddleware.js";
import { EventsModule } from "./events/events.module.js";

@Module({
  imports: [EventsModule], // Laisse tes autres modules ici (ex: TypeOrmModule, ConfigModule) si tu en as
  controllers: [AuthController], // Ton AuthController est déclaré ici directement
  providers: [AuthService], // Ton AuthService est déclaré ici directement
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // 💡 On protège toute l'application sauf l'inscription et la connexion
      .exclude(
        { path: "auth/register", method: RequestMethod.POST },
        { path: "auth/login", method: RequestMethod.POST },
      )
      .forRoutes("*");
  }
}
