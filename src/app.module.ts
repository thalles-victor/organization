import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '#env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: ENV.POSTGRES_PORT,
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      database: ENV.POSTGRES_DB,
      entities: [`${__dirname}/Application/Entities/*.entity{.js,.ts}`],
      migrations: [
        `${__dirname}/Application/Infra/Repositories/TypeOrm/migrations/{.ts,*js}`,
      ],
      migrationsRun: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true, // Transforma os parâmetros automaticamente
        whitelist: true, // Remove campos não validados
      }),
    },

    AppService,
  ],
})
export class AppModule {}
