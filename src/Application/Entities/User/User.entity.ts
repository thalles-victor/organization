import { Exclude, Expose } from 'class-transformer';
import { ROLE } from 'src/Application/@Shared/metadata/role';
import { TABLE } from 'src/Application/@Shared/metadata/table';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: TABLE.user })
export class UserEntity {
  @Expose()
  @PrimaryColumn('uuid')
  id: string;

  @Expose()
  @PrimaryColumn({ type: 'varchar', length: 120 })
  name: string;

  @Expose()
  @PrimaryColumn({ type: 'varchar', length: 120 })
  email: string;

  @Exclude()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  password: string;

  @Expose()
  @PrimaryColumn({ type: 'varchar', length: 20, default: ROLE.USER })
  role: ROLE;

  @Expose()
  @Column({ type: 'timestamptz', nullable: true, default: null })
  deletedAt: Date | null;

  @Expose()
  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Expose()
  @Column({ type: 'timestamptz', update: true })
  updatedAt: Date;
}

export class UserUpdateEntity {
  name: string;
  role: string;
  updatedAt: string;
}

export type UserUniqueRef = Pick<UserEntity, 'id'> | Pick<UserEntity, 'email'>;
