/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUseCase } from './SignUp.usecase';
import { SignUpDto } from './SignUp.dto';
import { KEY_OF_INJECTION, ThrowErrorMessage } from '#metadata';
import { UserInMemoryRepository } from 'src/Application/Infra/Repositories/User/UserInMemory.repository';
import { ROLE } from 'src/Application/@Shared/metadata/role';
import { UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let signUpUseCase: SignUpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignUpUseCase,
        {
          provide: KEY_OF_INJECTION.USER_REPOSITORY,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    signUpUseCase = module.get<SignUpUseCase>(SignUpUseCase);
  });

  describe('Create user Account', () => {
    it('seja possivel criar um usuário que não exista', async () => {
      const userDto: SignUpDto = {
        name: 'thalles',
        email: 'thalles@gmail.com',
        password: 'minhasenha123',
      };

      const userCreated = await signUpUseCase.execute(userDto);

      expect(userCreated.name).toBe(userDto.name);
      expect(userCreated.password).not.toBe(userDto.password);
      expect(userCreated.role).toBe(ROLE.USER);
      expect(userCreated.role).toBeDefined();
    });

    it('não seja possível criar um usuário que já exista', async () => {
      const userDto: SignUpDto = {
        name: 'thalles',
        email: 'thalles@gmail.com',
        password: 'minhasenha123',
      };

      await signUpUseCase.execute(userDto);

      expect(async () => await signUpUseCase.execute(userDto)).rejects.toThrow(
        new UnauthorizedException(ThrowErrorMessage.signUp_already_exist),
      );
    });
  });
});
