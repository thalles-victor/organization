import 'dotenv/config';
import { Test } from '@nestjs/testing';
import { SignInUseCase } from './SignIn.usecase';
import {
  KEY_OF_INJECTION,
  ThrowErrorMessage,
} from 'src/Application/@Shared/metadata';
import { UserInMemoryRepository } from 'src/Application/Infra/Repositories/User/UserInMemory.repository';
import { SignInDto } from './SignIn.dto';
import { UnauthorizedException } from '@nestjs/common';
import { SignUpUseCase } from '../SignUp/SignUp.usecase';
import { SignUpDto } from '../SignUp/SignUp.dto';
import { jwtAlreadyExpireBaseUnixEpoch } from 'src/Application/@Shared/utils';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let signUpUseCase: SignUpUseCase;

  // create default user
  const baseSignUpDto: SignUpDto = {
    name: 'baseuser',
    email: 'base@gmail.com',
    password: '#FakePasword',
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        {
          provide: KEY_OF_INJECTION.USER_REPOSITORY,
          useClass: UserInMemoryRepository,
        },
        SignInUseCase,
        SignUpUseCase,
      ],
    }).compile();

    signInUseCase = moduleRef.get<SignInUseCase>(SignInUseCase);
    signUpUseCase = moduleRef.get<SignUpUseCase>(SignUpUseCase);

    await signUpUseCase.execute(baseSignUpDto);
  });

  it('should be defined', () => {
    expect(signInUseCase).toBeDefined();
  });

  it('should be able authenticate a correct user', async () => {
    const signInDto: SignInDto = {
      email: baseSignUpDto.email,
      password: baseSignUpDto.password,
    };

    const userAuthenticated = await signInUseCase.execute(signInDto);

    expect(userAuthenticated).toBeDefined();
    expect(userAuthenticated.accessToken.token).toBeDefined();
    expect(userAuthenticated.user.email).toBe(signInDto.email);

    expect(
      jwtAlreadyExpireBaseUnixEpoch(
        userAuthenticated.accessToken.expiresInUnixEpoch,
      ),
    ).toEqual(false);
  });

  it('not should be able authenticate with user not registered', async () => {
    const signInDto: SignInDto = {
      email: 'jhon@gmail.com',
      password: '#FakePassword123',
    };

    expect(async () => await signInUseCase.execute(signInDto)).rejects.toThrow(
      new UnauthorizedException(ThrowErrorMessage.signIn_userNotExist),
    );
  });

  it('not should be able authenticate a user that password is invalid', async () => {
    const signInDto: SignInDto = {
      email: baseSignUpDto.email,
      password: '#@!!WrongPassword123!!!',
    };

    await expect(signInUseCase.execute(signInDto)).rejects.toThrow(
      new UnauthorizedException(ThrowErrorMessage.signIn_passwordInvalid),
    );
  });

  it('not should be able authenticate a user deleted ', () => {});
});
