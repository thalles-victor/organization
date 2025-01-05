import 'dotenv/config';
import { Test } from '@nestjs/testing';
import { AuthController } from './Auth.controller';
import { KEY_OF_INJECTION } from 'src/Application/@Shared/metadata';
import { UserInMemoryRepository } from 'src/Application/Infra/Repositories/User/UserInMemory.repository';
import { SignUpDto } from './UseCases/SignUp/SignUp.dto';
import { SignUpUseCase } from './UseCases/SignUp/SignUp.usecase';
import { AuthService } from './Auth.service';
import { SignInDto } from './UseCases/SinIn/SignIn.dto';
import { SignInUseCase } from './UseCases/SinIn/SignIn.usecase';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        {
          provide: KEY_OF_INJECTION.USER_REPOSITORY,
          useClass: UserInMemoryRepository,
        },
        AuthService,
        SignUpUseCase,
        SignInUseCase,
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('test controller', () => {
    it('is not possible to get the password from the signIn controller', async () => {
      const userDto: SignUpDto = {
        name: 'jhon',
        email: 'jhon@gmail.com',
        password: '#Minhasenhajhon123',
      };

      const userCreated = await authController.signUp(userDto);

      expect(userCreated.data.user['password']).not.toBeDefined();
    });

    it('is not possible to get the password from the signIn controller', async () => {
      // // create user
      const signUpDto: SignUpDto = {
        name: 'jhon',
        email: 'jhon@gmail.com',
        password: '#Minhasenhajhon123',
      };

      const userCreated = await authController.signUp(signUpDto);
      expect(userCreated).toBeDefined();

      // auth the user created
      const singInDto: SignInDto = {
        email: signUpDto.email,
        password: signUpDto.password,
      };

      const signInResult = await authController.signIn(singInDto);

      expect(signInResult).toBeDefined();
      expect(signInResult.data.user['password']).not.toBeDefined();
    });
  });
});
