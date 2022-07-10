import { injectable } from "inversify";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { UserModel } from "../../../database/models/user";
import { IUserRepo } from "../../../domain/ports/user/IUserRepo";

@injectable()
export class UserRepo extends BaseRepo implements IUserRepo {
  constructor() {
    super(UserModel);
  }

  async findByEmailForLogin(email: string) {
    return await this.findOne!({
      condition: { email: email.toLowerCase() },
      attributes: ["id", "name", "email", "password"],
    });
  }

  async isUserExists(userId: number) {
    return await this.findOne!({
      condition: { id: userId },
      attributes: ["id"],
    });
  }

  async isEmailExists(email: string) {
    return await this.findOne!({
      condition: { email },
      attributes: ["id", "email"],
    });
  }
}
