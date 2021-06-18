import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MongoExceptionFilter } from './helpers/error.handling';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MongoExceptionFilter());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('xyz-backend API documentation')
    .setDescription('api documentation for the xyz documentation')
    .setVersion('1.0')
    .build();
  
  const options: SwaggerCustomOptions = {

  }
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
  
  await app.listen(AppModule.port);
}
bootstrap();
