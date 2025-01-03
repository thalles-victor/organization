import { UserEntity, UserUniqueRef, UserUpdateEntity } from '#entities';
import { IBaseRepositoryContract } from '../IBase.repository-contract';

export type IUserRepositoryContract = IBaseRepositoryContract<
  UserEntity,
  UserUpdateEntity,
  UserUniqueRef
>;
