import { BaseFakeRepo } from '@core/tests/BaseFakeRepo';
import User from '@user/entities/user';
import IUserRepository from '@user/repositories/IUserRepository';

export default class FakeUserRepository extends BaseFakeRepo<User> implements IUserRepository {
  public async insert(user: User): Promise<User> {
    this.addFakeItem(user);
    return user;
  }

  public async update(user: User): Promise<User> {
    return user;
  }

  public async exists(username: string): Promise<boolean> {
    return Boolean(this._items.find(it => it.username.value === username));
  }

  public async findById(id: string): Promise<User | null> {
    const user = this._items.find(it => it.id.toString() === id);

    return user || null;
  }

  protected compareFakeItems(a: User, b: User): boolean {
    return a.id.equals(b.id);
  }
}
