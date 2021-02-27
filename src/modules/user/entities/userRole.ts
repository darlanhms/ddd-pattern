import ValueObject from '@core/domain/ValueObject';
import Guard from '@core/logic/Guard';
import Result from '@core/logic/Result';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
}

interface UserRoleProps {
  value: UserRoleEnum;
}

export default class UserRole extends ValueObject<UserRoleProps> {
  get value(): UserRoleEnum {
    return this.props.value;
  }

  private constructor(props: UserRoleProps) {
    super(props);
  }

  public static create(role: UserRoleEnum): Result<UserRole> {
    const guardIsUndefined = Guard.againstNullOrUndefined(role, 'role');

    if (!guardIsUndefined.succeeded) {
      return Result.fail<UserRole>(guardIsUndefined.message);
    }

    const guardIsOneOF = Guard.isOneOf(role, ['ADMIN', 'AGENT'], 'role');

    if (!guardIsOneOF.succeeded) {
      return Result.fail<UserRole>(guardIsOneOF.message);
    }

    return Result.ok(new UserRole({ value: role }));
  }
}
