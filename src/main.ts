import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('SERVER_PORT');

    const configuration = new DocumentBuilder()
        .setTitle('Google Classroom Clone')
        .setDescription('The Google Classroom Clone API description')
        .setVersion('1.0')
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

    // for compressing responses
    app.use(compression.default);

    // for basic security
    app.use(helmet());

    // enabling Cross-origin resource sharing: allows resources to be requested from another domain
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
    });

    await app.listen(port, () => {
        console.log('[WEB] Listening To ', port);
    });
}

bootstrap();
