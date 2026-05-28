// import 'dotenv/config'; 
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common'; 
export {};
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // Activation des validations globales (par exemple pour les DTOs)
//   app.useGlobalPipes(new ValidationPipe()); 
//   // Configuration de Swagger
//   const config = new DocumentBuilder()
//     .setTitle('Event Management API')
//     .setDescription("Documentation de l'API de gestion d'événements")
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);
//   await app.listen(3000);
//   console.log(' Serveur démarré sur http://localhost:3000');
//   console.log('Documentation Swagger disponible sur http://localhost:3000/api');
// }
// bootstrap().catch(err => console.error('Erreur au démarrage:', err));
//# sourceMappingURL=app.js.map