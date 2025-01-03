import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';

@Module({ controllers: [AuthController], providers: [AuthService] })
export class AuthModule {}
