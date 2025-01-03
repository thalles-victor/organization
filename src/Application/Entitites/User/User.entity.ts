export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  isBanned: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
