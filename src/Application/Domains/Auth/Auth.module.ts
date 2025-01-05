import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { AuthController } from './Auth.controller';
import { SignUpUseCase } from './UseCases/SignUp/SignUp.usecase';
import { RepositoriesModule } from 'src/Application/Infra/Repositories/Repositories.module';
import { KEY_OF_INJECTION } from '#metadata';
import { UserTypeOrmRepository } from 'src/Application/Infra/Repositories/User/UserTypeOrm.repository';
import { SignInUseCase } from './UseCases/SinIn/SignIn.usecase';

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
    SignInUseCase,
  ],
})
export class AuthModule {}
