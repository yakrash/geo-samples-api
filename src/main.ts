import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.enableShutdownHooks();
    app.enableCors({
        origin: `${configService.get('CORS')}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
    await app.listen(configService.get('PORT'));
}

bootstrap();
