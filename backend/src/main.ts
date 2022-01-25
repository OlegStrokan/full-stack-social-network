import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const PORT = process.env.PORT || 8888;

    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`),
    );

    app.useGlobalPipes(new ValidationPipe())
}
bootstrap();
