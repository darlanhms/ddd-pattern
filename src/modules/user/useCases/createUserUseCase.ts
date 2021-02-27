import IUserRepository from '@user/repositories/IUserRepository';
import UseCase from '@core/domain/UseCase';
import { Either, left, right } from '@core/logic/Either';
import { GenericAppError } from '@core/logic/GenericError';
import Result from '@core/logic/Result';
import { CreateUserErrors } from './createUserErrors';

import User from '../entities/user';
import UserPassword from '../entities/userPassword';
import UserRole from '../entities/userRole';
import UserUsername from '../entities/userUsername';
import CreateUserDTO from './createUserDTO';

type Response = Either<
  GenericAppError.UnexpectedError | CreateUserErrors.AccountAlreadyExists | CreateUserErrors.InvalidParam,
  User
>;

export default class CreateUserUseCase implements UseCase<CreateUserDTO, Response> {
  public constructor(private userRepo: IUserRepository) {}

  public async execute(dto: CreateUserDTO): Promise<Response> {
    const usernameOrError = UserUsername.create(dto.username);
    const roleOrError = UserRole.create(dto.role);
    const passwordOrError = UserPassword.create({ value: dto.password });

    const combinedResults = Result.combine([usernameOrError, roleOrError, passwordOrError]);

    if (combinedResults.isFailure) {
      return left(new CreateUserErrors.InvalidParam(combinedResults.error));
    }

    const userOrError = User.create({
      name: dto.name,
      password: passwordOrError.getValue(),
      username: usernameOrError.getValue(),
      role: roleOrError.getValue(),
    });

    if (userOrError.isFailure) {
      return left(new CreateUserErrors.InvalidParam(userOrError.errorValue() as string));
    }

    const user: User = userOrError.getValue();

    const exists = await this.userRepo.exists(user.username.value);

    if (exists) {
      return left(new CreateUserErrors.AccountAlreadyExists(user.username.value));
    }

    try {
      const userSaved = await this.userRepo.insert(user);

      return right(userSaved);
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
}
