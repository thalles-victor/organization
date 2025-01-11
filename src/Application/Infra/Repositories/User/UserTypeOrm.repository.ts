import { UserEntity, UserUniqueRef, UserUpdateEntity } from '#entities';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepositoryContract } from './IUser.repository-contract';
import { GenericPaginationDto, splitKeyAndValue } from '#utils';
import { SelectFieldsWithRelations } from '#types';

@Injectable()
export class UserTypeOrmRepository implements IUserRepositoryContract {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  create(entity: UserEntity): Promise<UserEntity> {
    try {
      const userTypeOrmEntity = this.userRepository.create(entity);

      return this.userRepository.save(userTypeOrmEntity);
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
      const userToUpdate = await this.userRepository.findOne({
        where: { [key]: value },
      });

      const updateUser = Object.assign(userToUpdate, updateEntity);

      return this.userRepository.save(updateUser);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async delete(unqRef: UserUniqueRef): Promise<void> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      await this.userRepository.delete({ [key]: value });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getBy<F extends keyof UserEntity, R extends keyof UserEntity>(
    unqRef: UserUniqueRef,
    fields?: F[],
    relations?: R[],
  ): Promise<SelectFieldsWithRelations<UserEntity, F, R>> {
    const [key, value] = splitKeyAndValue(unqRef);

    try {
      return await this.userRepository.findOne({
        where: { [key]: value },
        select: fields,
        relations,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMany(pagination: GenericPaginationDto): Promise<UserEntity[]> {
    try {
      throw new Error('method not implemented');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
