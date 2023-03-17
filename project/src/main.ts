import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { HttpExceptionFilter } from './exceptionFilters/http-exception.filter';
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

    // app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter());

    // app.use(
    //     session({
    //         resave: false,
    //         saveUninitialized: false,
    //         secrete: process.env.COOKIE_SECRET,
    //         cookie: {
    //             httpOnly: true,
    //         },
    //     }),
    // );
    // app.use(passport.initialize());
    // app.use(passport.session());
    await app.listen(port);
    console.log(`Listening on port ${port}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
