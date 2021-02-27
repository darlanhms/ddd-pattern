import User from '@user/entities/user';
import { UserRoleEnum } from '@user/entities/userRole';
import FakeUserRepository from '@user/repositories/tests/fakes/FakeUserRepository';
import { CreateUserErrors } from './createUserErrors';
import CreateUserUseCase from './createUserUseCase';

let useCase: CreateUserUseCase;

describe('CreateUserUseCaseTest', () => {
  beforeEach(() => {
    const userRepo = new FakeUserRepository();

    useCase = new CreateUserUseCase(userRepo);
  });

  it('Should be able to execute without problems', async () => {
    let user: User;
    let errorOcurred = false;

    try {
      const result = await useCase.execute({
        name: 'Usuário de teste',
        username: 'usuario',
        password: '1234adcd',
        role: UserRoleEnum.ADMIN,
      });

      if (result.isLeft()) {
        errorOcurred = true;
      } else {
        user = result.value;
      }
    } catch (error) {
      errorOcurred = true;
    }

    expect(user).toBeTruthy();
    expect(user instanceof User).toBeTruthy();
    expect(errorOcurred).toBeFalsy();
  });

  it("Shouldn't be able to add same username twice", async () => {
    await useCase.execute({
      name: 'Usuário de teste',
      username: 'usuario',
      password: '1234adcd',
      role: UserRoleEnum.ADMIN,
    });

    const erroredExec = await useCase.execute({
      name: 'Usuário de teste 2',
      username: 'usuario',
      password: '1234adcd',
      role: UserRoleEnum.ADMIN,
    });

    expect(erroredExec.isLeft()).toBeTruthy();
    expect(erroredExec.isRight()).toBeFalsy();
    expect(erroredExec.value.constructor === CreateUserErrors.AccountAlreadyExists);
  });
});
