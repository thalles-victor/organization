import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SignUpUseCase } from './UseCases/SignUp/SignUp.usecase';
import { SignUpDto } from './UseCases/SignUp/SignUp.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Post('/signUp')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }
}
