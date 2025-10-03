import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rawOrigins = process.env.CORS_ORIGINS?.split(',').map((origin) =>
    origin.trim(),
  );
  const allowedOrigins = rawOrigins?.filter(Boolean);

  app.enableCors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
    credentials: true,
  });

  app.setGlobalPrefix('api', { exclude: ['docs'] });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Vemovel API')
    .setDescription('Documentação da API Vemovel')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const port = Number(process.env.PORT) || 3001;
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
  Logger.log(`🚀 API rodando em http://${host}:${port}`, 'Bootstrap');
}
bootstrap();
