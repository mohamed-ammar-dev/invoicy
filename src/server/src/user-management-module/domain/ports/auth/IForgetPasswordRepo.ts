import { IBaseRepo } from "../../../../shared/interfaces/IBaseRepo";

type ForgetPasswordModel = Promise<{
  userId: number;
  identifier: string;
  code: number;
  counter: number;
  expireAt: Date;
}>;

export interface IForgetPasswordRepo extends IBaseRepo {
  findByUserId(userId: number): Promise<{
    counter: number;
  }>;
  findByEmail(email: string): ForgetPasswordModel;
  resetCounter(): Promise<void>;
}
