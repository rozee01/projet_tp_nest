import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

import helmet from 'helmet';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('SERVER_PORT') ?? 3001;

    const configuration = new DocumentBuilder()
        .setTitle('Google Classroom Clone')
        .setDescription('The Google Classroom Clone API description')
        .setVersion('1.0.1')
        .addTag('classroom')
        .build();

    const document = SwaggerModule.createDocument(app, configuration);

    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );

    // for basic security
    app.use(helmet());

    // enabling Cross-origin resource sharing: allows resources to be requested from another domain
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
    });
    // Augmenter la limite de taille du corps de la requête à 50mb
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    await app.listen(port, async () => {
        console.log('[WEB] Listening To ', await app.getUrl());
    });
}

bootstrap();
