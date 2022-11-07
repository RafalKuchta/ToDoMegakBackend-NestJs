import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { whitelistCors } from './utils/config/cors-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('app');

  app.enableCors({
    origin: whitelistCors.address,
    methods: whitelistCors.methods,
    credentials: true,
    optionsSuccessStatus: 200,
  });

  app.use(cookieParser());

  await app.listen(3001, () => {
    console.log("http://localhost:3001")
  });
}
(async () => {
  await bootstrap();
})();