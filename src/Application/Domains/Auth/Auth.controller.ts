import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SignUpUseCase } from './UseCases/SignUp/SignUp.usecase';
import { SignUpDto } from './UseCases/SignUp/SignUp.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/Application/Entities';
import { ENV } from 'src/Application/@Shared/env';
import { SignInDto } from './UseCases/SinIn/SignIn.dto';
import { SignInUseCase } from './UseCases/SinIn/SignIn.usecase';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    const result = await this.signUpUseCase.execute(signUpDto);
    const userSanitized = plainToInstance(UserEntity, result.user);

    return {
      data: {
        accessToken: result.accessToken,
        user: userSanitized,
      },
      href: {
        url: `${ENV.BACKEND_URL}:${ENV.BACKEND_PORT}/v1/user`,
        method: 'GET',
      },
    };
  }

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto) {
    const result = await this.signInUseCase.execute(signInDto);

    const userSanitized = plainToInstance(UserEntity, result.user);

    return {
      data: {
        accessToken: result.accessToken,
        user: userSanitized,
      },
      href: {
        url: `${ENV.BACKEND_URL}:${ENV.BACKEND_PORT}/v1/user`,
        method: 'GET',
      },
    };
  }
}
