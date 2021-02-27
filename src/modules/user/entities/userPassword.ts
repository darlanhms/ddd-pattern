import * as bcrypt from 'bcryptjs';
import ValueObject from '@core/domain/ValueObject';
import Result from '@core/logic/Result';
import Guard from '@core/logic/Guard';

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props) {
    super(props);
  }

  /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    }
    return this.props.value === plainTextPassword;
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise(resolve => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      });
    });
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }

  public getHashedValue(): Promise<string> {
    return new Promise(resolve => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      }
      return resolve(this.hashPassword(this.props.value));
    });
  }

  public static isAppropriateLength(value: string): boolean {
    return value.length >= 8;
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password');

    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    }

    if (!props.hashed) {
      if (!this.isAppropriateLength(props.value)) {
        return Result.fail<UserPassword>('Password doesnt meet criteria [8 chars min].');
      }
    }

    return Result.ok<UserPassword>(
      new UserPassword({
        value: props.value,
        hashed: !!props.hashed === true,
      }),
    );
  }
}
