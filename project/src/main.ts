import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { HttpExceptionFilter } from './exceptionFilters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle('enkor-bnb')
        .setDescription('The enkor-bnb API description')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(passport.initialize());
    await app.listen(port);
    console.log(`Listening on port ${port}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
