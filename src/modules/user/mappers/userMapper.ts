import UniqueEntityID from '@core/domain/UniqueEntityID';
import UserPassword from '@user/entities/userPassword';
import UserRole from '@user/entities/userRole';
import UserUsername from '@user/entities/userUsername';
import User, { RawUser } from '../entities/user';

export default class UserMapper {
  public static toPersistence(user: User): RawUser {
    return {
      id: user.id.toString(),
      name: user.name,
      password: user.password.value,
      role: user.role.value,
      username: user.username.value,
    };
  }

  public static toDomain(raw: RawUser): User {
    const roleOrError = UserRole.create(raw.role);
    const usernameOrError = UserUsername.create(raw.username);
    const passwordOrError = UserPassword.create({ value: raw.password });

    const userOrError = User.create(
      {
        name: raw.name,
        password: passwordOrError.getValue(),
        role: roleOrError.getValue(),
        username: usernameOrError.getValue(),
      },
      new UniqueEntityID(raw.id),
    );

    if (userOrError.isFailure) {
      console.error(userOrError.error);
    }

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
}
