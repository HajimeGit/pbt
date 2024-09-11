import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function setUpOpenApi(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('PBT API')
    .setDescription('The Personal Budget Tracker API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
