import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEntity, UserUniqueRef, UserUpdateEntity } from '#entities';
import { IUserRepositoryContract } from './IUser.repository-contract';
import { GenericPaginationDto, splitKeyAndValue } from '#utils';
import { SelectFieldsWithRelations } from '#types';

@Injectable()
export class UserInMemoryRepository implements IUserRepositoryContract {
  private readonly users: UserEntity[] = [];

  async create(entity: UserEntity): Promise<UserEntity> {
    try {
      this.users.push(entity);
      return entity;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async update(
    unqRef: UserUniqueRef,
    updateEntity: UserUpdateEntity,
  ): Promise<UserEntity> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const userIndex = this.users.findIndex((user) => user[key] === value);
      if (userIndex === -1) throw new Error('User not found');

      this.users[userIndex] = { ...this.users[userIndex], ...updateEntity };
      return this.users[userIndex];
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async delete(unqRef: UserUniqueRef): Promise<void> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const userIndex = this.users.findIndex((user) => user[key] === value);
      if (userIndex === -1) throw new Error('User not found');

      this.users.splice(userIndex, 1);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      return [...this.users];
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getBy<F extends keyof UserEntity, R extends keyof UserEntity>(
    unqRef: UserUniqueRef,
    fields?: F[],
    relations?: R[],
  ): Promise<SelectFieldsWithRelations<UserEntity, F, R> | null> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      const user = this.users.find((user) => user[key] === value);
      if (!user) return null;

      const selectedFields =
        fields?.reduce((acc, field) => {
          acc[field] = user[field];
          return acc;
        }, {} as Partial<UserEntity>) || {};

      const selectedRelations =
        relations?.reduce((acc, relation) => {
          acc[relation] = user[relation];
          return acc;
        }, {} as Partial<UserEntity>) || {};

      return {
        ...selectedFields,
        ...selectedRelations,
      } as SelectFieldsWithRelations<UserEntity, F, R>;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getMany(pagination: GenericPaginationDto): Promise<UserEntity[]> {
    try {
      throw new Error('method not implemented');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
