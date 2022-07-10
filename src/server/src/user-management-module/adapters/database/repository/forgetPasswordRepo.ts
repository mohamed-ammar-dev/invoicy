import { injectable } from "inversify";
import { Op } from "sequelize";
import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import { ForgetPasswordModel } from "../../../database/models/forgetPassword";
import { IForgetPasswordRepo } from "../../../domain/ports/auth/IForgetPasswordRepo";

@injectable()
export class ForgetPasswordRepo
  extends BaseRepo
  implements IForgetPasswordRepo
{
  constructor() {
    super(ForgetPasswordModel);
  }

  async findByUserId(userId: number) {
    return await this.findOne!({
      condition: { userId },
      attributes: ["counter"],
    });
  }

  async findByEmail(email: string) {
    return await this.findOne!({
      condition: { identifier: email },
    });
  }

  async resetCounter() {
    await this.update({
      condition: {
        counter: {
          [Op.ne]: 0,
        },
      },
      update: {
        counter: 0,
      },
    });
  }
}
