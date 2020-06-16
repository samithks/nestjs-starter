import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Nestjs Starter')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // create a rotating write stream
  const accessLogStream = createStream('access.log', {
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily,
    compress: 'gzip', // compress rotated files
    maxFiles: 10,
    path: path.join(__dirname, '../../logs')
  });
  app.use(morgan('combined', { stream: accessLogStream }));
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<number>('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
