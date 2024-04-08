import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IRequest } from './common/interfaces/request.interface';
import { NextFunction } from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3030, '0.0.0.0', () => {
    Logger.log('Server started on port 3030');
  });
}

bootstrap();
