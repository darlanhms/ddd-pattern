import BaseController from '@core/infra/BaseController';
import UserMapper from '@user/mappers/userMapper';
import CreateUserDTO from './createUserDTO';
import { CreateUserErrors } from './createUserErrors';
import CreateUserUseCase from './createUserUseCase';

export default class CreateUserController extends BaseController {
  public constructor(private useCase: CreateUserUseCase) {
    super();
  }

  protected async executeImplementation(): Promise<unknown> {
    try {
      const dto = this.req.body as CreateUserDTO;

      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserErrors.AccountAlreadyExists:
            return this.conflict(error.message);
          case CreateUserErrors.InvalidParam:
            return this.forbidden(error.message);
          default:
            return this.fail(error.message);
        }
      }

      const persistedUser = UserMapper.toPersistence(result.value);

      return this.ok(this.res, { ...persistedUser, password: undefined });
    } catch (error) {
      return this.fail(error);
    }
  }
}
