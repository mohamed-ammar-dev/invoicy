import { IBaseRepo } from "../../../../shared/interfaces/IBaseRepo";

type findByEmailForLoginReturn = Promise<{
  id: number;
  email: string;
  name: string;
  password: string;
  loginCounter: number;
  token?: string;
}>;

export interface IUserRepo extends IBaseRepo {
  isEmailExists(email: string): Promise<{ email: string; id: number }>;
  isUserExists(userId: number): Promise<{ id: number }>;
  findByEmailForLogin(email: string): findByEmailForLoginReturn;
}
