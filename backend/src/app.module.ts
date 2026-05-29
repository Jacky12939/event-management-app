import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
   
import { AuthService } from './services/authService';   
import { AuthController } from './routes/auth';
import { AuthMiddleware } from './middleware/AuthMiddleware';
import { EventsController } from './routes/events';
import { RolesController } from './routes/roles';
import { PrismaService } from './lib/prisma.service';

@Module({
  imports: [], 
  controllers: [ 
    AuthController,  
    EventsController,
    RolesController,
  ], 
  providers: [
    AuthService,
    PrismaService,
  ],         
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'events', method: RequestMethod.GET },
        { path: 'events/:id', method: RequestMethod.GET },
        
      )
      .forRoutes('*'); 
  }
}