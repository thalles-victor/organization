export type SelectFieldsWithRelations<
  Entity,
  Fields extends keyof Entity,
  Relations extends keyof Entity,
> = {
  [F in Fields]: Entity[F];
} & {
  [R in Relations]: Entity[R];
};
