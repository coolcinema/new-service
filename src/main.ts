import { Registry } from '@coolcinema/contracts';
import { createServer } from 'nice-grpc';
// import { reflectionService } from 'nice-grpc-server-reflection';
import { IdentityServiceDefinition } from './_gen/grpc/grpc/identity';
import { IdentityServiceImpl } from './identity.service';

async function main() {
  const server = createServer();
  server.add(IdentityServiceDefinition, new IdentityServiceImpl());
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
