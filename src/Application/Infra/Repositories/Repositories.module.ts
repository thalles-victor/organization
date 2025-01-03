import { UserEntity } from '#entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeOrmRepository } from './User/UserTypeOrm.repository';
import { UserInMemoryRepository } from './User/UserInMemory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserTypeOrmRepository, UserInMemoryRepository],
  exports: [TypeOrmModule],
})
export class RepositoriesModule {}
