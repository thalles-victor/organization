import 'dotenv/config';
import { Test } from '@nestjs/testing';
import { AuthController } from './Auth.controller';
import { KEY_OF_INJECTION } from 'src/Application/@Shared/metadata';
import { UserInMemoryRepository } from 'src/Application/Infra/Repositories/User/UserInMemory.repository';
import { SignUpDto } from './UseCases/SignUp/SignUp.dto';
import { SignUpUseCase } from './UseCases/SignUp/SignUp.usecase';
import { AuthService } from './Auth.service';

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
        SignUpUseCase,
        AuthService,
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('test SingUp controller', () => {
    it('should be able create a user', async () => {
      const userDto: SignUpDto = {
        name: 'jhon',
        email: 'jhon@gmail.com',
        password: '#Minhasenhajhon123',
      };

      const userCreated = await authController.signUp(userDto);

      expect(userCreated.data.user.password).not.toBeDefined();
    });
  });
});