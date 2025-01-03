import { SelectFieldsWithRelations } from '#types';
import { GenericPaginationDto } from '#utils';

export interface IBaseRepositoryContract<Entity, UpdateEntity, UniqRefs> {
  create(entity: Entity): Promise<Entity>;
  update(unqRef: UniqRefs, updateEntity: UpdateEntity): Promise<Entity>;
  delete(unqRef: UniqRefs): Promise<void>;
  getAll(): Promise<Entity[]>;
  getBy<F extends keyof Entity, R extends keyof Entity>(
    unqRef: UniqRefs,
    fields?: F[],
    relations?: R[],
  ): Promise<SelectFieldsWithRelations<Entity, F, R> | null>;
  getMany(pagination: GenericPaginationDto): Promise<Entity[]>;
}
