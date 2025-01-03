import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './SignUp.dto';
import { IUserRepositoryContract } from 'src/Application/Infra/Repositories/User/IUser.repository-contract';
import { KEY_OF_INJECTION } from '#metadata';
import { ThrowErrorMessage } from 'src/Application/@Shared/metadata/error-messages';
import { UserEntity } from '#entities';
import { defaultUniqueId } from '#utils';
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
      ['id'],
    );

    if (userExist) {
      throw new UnauthorizedException(ThrowErrorMessage.signUp_already_exist);
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

    return userCreated;
  }
}