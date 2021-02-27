import User from '@user/entities/user';
import UserMapper from '@user/mappers/userMapper';
import IUserRepository from '@user/repositories/IUserRepository';
import UserEntity from 'src/infra/database/TypeORM/entities/user';
import { getRepository } from 'typeorm';

export default class UserRepository implements IUserRepository {
  public async insert(user: User): Promise<User> {
    const persistedUser = UserMapper.toPersistence(user);
    const userRepo = getRepository(UserEntity);

    const userToSave = userRepo.create({
      ...persistedUser,
      password: await user.password.getHashedValue(),
    });

    const newUser = await userRepo.save(userToSave);

    return UserMapper.toDomain(newUser);
  }

  public async update(user: User): Promise<User> {
    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await getRepository(UserEntity).findOne(id);

    return user ? UserMapper.toDomain(user) : null;
  }

  public async exists(username: string): Promise<boolean> {
    const existentUser = await getRepository(UserEntity).findOne({
      where: {
        username,
      },
    });

    return Boolean(existentUser);
  }
}
