import { UserRoleEnum } from '../entities/userRole';

export default interface CreateUserDTO {
  name: string;
  role: UserRoleEnum;
  username: string;
  password: string;
}
