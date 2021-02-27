/* eslint-disable dot-notation */
import User from '@user/entities/user';
import UserPassword from '@user/entities/userPassword';
import UserRole, { UserRoleEnum } from '@user/entities/userRole';
import UserUsername from '@user/entities/userUsername';
import FakeUserRepository from './FakeUserRepository';

let repo: FakeUserRepository;

describe('FakeUserRepositoryTest', () => {
  beforeEach(() => {
    repo = new FakeUserRepository();
  });

  it('Should be able to add an item', () => {
    repo.insert(
      User.create({
        name: 'Usuário',
        role: UserRole.create(UserRoleEnum.ADMIN).getValue(),
        username: UserUsername.create('usuario').getValue(),
        password: UserPassword.create({ value: 'abc12312' }).getValue(),
      }).getValue(),
    );

    expect(repo['_items'].length).toBe(1);
  });

  it('Should be able to find already registered user', () => {
    repo.insert(
      User.create({
        name: 'Usuário',
        role: UserRole.create(UserRoleEnum.ADMIN).getValue(),
        username: UserUsername.create('usuario').getValue(),
        password: UserPassword.create({ value: 'abc12312' }).getValue(),
      }).getValue(),
    );

    const alreadyExistentUser = repo.exists('usuario');

    expect(alreadyExistentUser).toBeTruthy();
  });
});
