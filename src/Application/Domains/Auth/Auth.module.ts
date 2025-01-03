import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { SignUpUseCase } from './UseCases/SignUp/SignUp.usecase';
import { RepositoriesModule } from 'src/Application/Infra/Repositories/Repositories.module';
import { KEY_OF_INJECTION } from '#metadata';
import { UserTypeOrmRepository } from 'src/Application/Infra/Repositories/User/UserTypeOrm.repository';

@Module({
  imports: [RepositoriesModule],
  controllers: [AuthController],
  providers: [
    {
      provide: KEY_OF_INJECTION.USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
    AuthService,
    SignUpUseCase,
  ],
})
export class AuthModule {}
