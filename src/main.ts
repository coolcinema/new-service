import { Registry } from '@coolcinema/contracts';
import { createServer } from 'nice-grpc';
import { NewServiceDefinition } from './_gen/grpc/grpc/new';
import { NewServiceImpl } from './new.service';

async function main() {
  const server = createServer();
  server.add(NewServiceDefinition, new NewServiceImpl());
  // server.add(reflectionService);

  const serviceDef = Registry.services['identity'];
  const port = serviceDef?.grpc?.main?.port || 5000;

  // В Docker/K8s слушаем 0.0.0.0, локально можно localhost
  await server.listen(`0.0.0.0:${port}`);
  console.log(`🚀 Identity Service listening on port ${port}`);
}

main();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3001);
// }
// bootstrap();
