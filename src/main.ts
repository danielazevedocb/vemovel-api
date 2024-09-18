import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API VEMOVEL')
    .setDescription(
      'A API VEMOVEL fornece funcionalidades para gerenciar condições de pagamento, incluindo a criação, leitura, atualização e exclusão de registros. Permite realizar operações CRUD (Create, Read, Update, Delete) em dados relacionados a condições, com endpoints para listar todas as condições, obter uma condição específica por ID, atualizar e deletar condições existentes.',
    )
    .setVersion('1.0')
    .addTag('cadtpg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
