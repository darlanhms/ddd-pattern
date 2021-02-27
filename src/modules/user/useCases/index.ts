import UserRepository from '@user/repositories/implementations/TypeORM/UserRepository';
import CreateUserController from './createUserController';
import CreateUserUseCase from './createUserUseCase';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
