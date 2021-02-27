import Repository from '@core/infra/Repository';
import User from '../entities/user';

export default interface IUserRepository extends Repository<User> {
  exists(username: string): Promise<boolean>;
  findById(id: string): Promise<User | null>;
}
