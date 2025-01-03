import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENV } from '#env';
import { AuthModule } from './Application/Domains/Auth/Auth.module';
import { UserEntity } from '#entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENV.POSTGRES_HOST,
      port: ENV.POSTGRES_PORT,
      username: ENV.POSTGRES_USER,
      password: ENV.POSTGRES_PASSWORD,
      database: ENV.POSTGRES_DB,
      entities: [UserEntity],
      migrations: [
        `${__dirname}/Application/Infra/Repositories/TypeOrm/migrations/{.ts,*js}`,
      ],
      migrationsRun: true,
      synchronize: false,
    }),
    AuthModule,
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
