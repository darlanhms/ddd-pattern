/* eslint-disable max-classes-per-file */
import UseCaseError from '@core/logic/UseCaseError';

export namespace CreateUserErrors {
  export class AccountAlreadyExists extends UseCaseError {
    constructor(username: string) {
      super(`O nome de usuário '${username}' já esta em uso por outra conta.`);
    }
  }

  export class InvalidParam extends UseCaseError {
    constructor(paramError: string) {
      super(paramError);
    }
  }
}
