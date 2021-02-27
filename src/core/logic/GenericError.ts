import UseCaseError from './UseCaseError';

export namespace GenericAppError {
  export class UnexpectedError extends UseCaseError {
    public constructor(err: unknown) {
      super(`An unexpected error occurred.`);
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: unknown): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
