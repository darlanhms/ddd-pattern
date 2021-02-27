import Entity from '@core/domain/Entity';
import UniqueEntityID from '@core/domain/UniqueEntityID';
import Guard from '@core/logic/Guard';
import Result from '@core/logic/Result';
import UserPassword from './userPassword';
import UserRole, { UserRoleEnum } from './userRole';
import UserUsername from './userUsername';

interface UserProps {
  name: string;
  role: UserRole;
  username: UserUsername;
  password: UserPassword;
}

export interface RawUser {
  id: string;
  name: string;
  role: UserRoleEnum;
  username: string;
  password: string;
}

export default class User extends Entity<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get username(): UserUsername {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.password, argumentName: 'password' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.username, argumentName: 'username' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    return Result.ok(new User(props, id));
  }
}
