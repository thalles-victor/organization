import { Controller } from '@nestjs/common';
import { AuthService } from './Auth.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
