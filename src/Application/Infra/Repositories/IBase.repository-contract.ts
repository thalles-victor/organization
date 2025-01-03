import { GenericPaginationDto } from '#utils';

export interface IBaseRepositoryContract<Entity, UpdateEntity, UniqRefs> {
  create(entity: Entity): Promise<Entity>;
  update(unqRef: UniqRefs, updateEntity: UpdateEntity): Promise<Entity>;
  delete(unqRef: UniqRefs): Promise<void>;
  getAll(): Promise<Entity[]>;
  getBy(unqRef: UniqRefs): Promise<Entity | null>;
  getMany(pagination: GenericPaginationDto): Promise<Entity[]>;
}
