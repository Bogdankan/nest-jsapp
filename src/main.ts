import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WeatherModule } from './weather.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const weatherApp = await NestFactory.create(WeatherModule);

  const config = new DocumentBuilder()
  .setTitle('Weather API')
  .setDescription('This API for weather')
  .setVersion('1.0')
  .addTag('API')
  .build();

const document = SwaggerModule.createDocument(weatherApp, config);
SwaggerModule.setup('api', weatherApp, document);

  await app.listen(3000);
  await weatherApp.listen(3001);
}
bootstrap();
