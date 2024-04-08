import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IRequest } from './common/interfaces/request.interface';
import { NextFunction } from 'express';

async function bootstrap() {
  let port = 3000;
  let app;

  while (!app) {
    try {
      app = await NestFactory.create(AppModule, { logger: false });
      await app.listen(port, '0.0.0.0');
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Trying next port...`);
        port++;
      } else {
        throw error;
      }
    }
  }

  app.use((req: IRequest, res: Response, next: NextFunction) => {
    req.context = new Map<string, unknown>();

    req.set = (key: string, value: unknown) => {
      req.context.set(key, value);
    };

    req.get = <T>(key: string) => {
      if (!req.context.has(key)) {
        throw new Error(`Key ${key} not found`);
      }

      return req.context.get(key) as T;
    };

    return next();
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  console.log(`Server started on port ${port}`);
}

bootstrap();
