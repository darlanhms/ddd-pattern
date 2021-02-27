import ValueObject from '@core/domain/ValueObject';
import Guard from '@core/logic/Guard';
import Result from '@core/logic/Result';

interface UserUsernameProps {
  value: string;
}

export default class UserUsername extends ValueObject<UserUsernameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserUsernameProps) {
    super(props);
  }

  public static create(username: string): Result<UserUsername> {
    const guardResult = Guard.againstNullOrUndefined(username, 'username');

    if (!guardResult.succeeded) {
      return Result.fail<UserUsername>(guardResult.message);
    }

    return Result.ok(new UserUsername({ value: username }));
  }
}
