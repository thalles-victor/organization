import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './SignIn.dto';
import {
  KEY_OF_INJECTION,
  ThrowErrorMessage,
} from 'src/Application/@Shared/metadata';
import { IUserRepositoryContract } from 'src/Application/Infra/Repositories/User/IUser.repository-contract';
import * as bcrypt from 'bcrypt';
import { genJWTAccess } from 'src/Application/@Shared/utils';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(KEY_OF_INJECTION.USER_REPOSITORY)
    private readonly userRepository: IUserRepositoryContract,
  ) {}

  async execute(signInDto: SignInDto) {
    const user = await this.userRepository.getBy({ email: signInDto.email });

    if (!user) {
      throw new UnauthorizedException(ThrowErrorMessage.signIn_userNotExist);
    }

    const passwordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException(ThrowErrorMessage.signIn_passwordInvalid);
    }

    if (user.deletedAt) {
      throw new ForbiddenException(ThrowErrorMessage.userBanned);
    }

    const jwtInfo = await genJWTAccess({ sub: user.id, role: user.role });

    return {
      accessToken: jwtInfo,
      user: user,
    };
  }
}
