import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { User } from '../schema/user.schema';
import { userStub } from './stubs/user.stub';

jest.mock('../auth.service');


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService]
    }).compile()

    controller = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.signUp(userStub());
      })

      test('then it should call authService', () => {
        expect(authService.signUp).toBeCalledWith(userStub());
      })
      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      })
    })
  });
});



