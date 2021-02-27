import { RawUser } from '@user/entities/user';
import { UserRoleEnum } from '@user/entities/userRole';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export default class UserEntity implements RawUser {
  @PrimaryColumn()
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column('varchar', { length: 20 })
  role: UserRoleEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
