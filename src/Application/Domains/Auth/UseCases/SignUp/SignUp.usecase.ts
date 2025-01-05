import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './SignUp.dto';
import { IUserRepositoryContract } from 'src/Application/Infra/Repositories/User/IUser.repository-contract';
import { KEY_OF_INJECTION, ThrowErrorMessage } from '#metadata';
import { UserEntity } from '#entities';
import { defaultUniqueId, genJWTAccess } from '#utils';
import * as bcrypt from 'bcrypt';
import { ROLE } from 'src/Application/@Shared/metadata/role';

@Injectable()
export class SignUpUseCase {
  constructor(
    @Inject(KEY_OF_INJECTION.USER_REPOSITORY)
    private readonly userRepository: IUserRepositoryContract,
  ) {}

  async execute(signUpDto: SignUpDto) {
    const userExist = await this.userRepository.getBy(
      { email: signUpDto.email },
      ['id'], // fields
      [], // relations
    );

    if (userExist) {
      throw new UnauthorizedException(ThrowErrorMessage.signUp_alreadyExist);
    }

    const hashedPassword = await bcrypt.hash(
      signUpDto.password,
      await bcrypt.genSalt(12),
    );

    const userEntity = Object.assign(new UserEntity(), {
      id: defaultUniqueId(),
      name: signUpDto.name,
      email: signUpDto.email,
      password: hashedPassword,
      role: ROLE.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    } as UserEntity);

    const userCreated = await this.userRepository.create(userEntity);

    const jwtInfo = await genJWTAccess({
      sub: userCreated.id,
      role: userCreated.role,
    });

    return {
      accessToken: jwtInfo,
      user: userCreated,
    };
  }
}
