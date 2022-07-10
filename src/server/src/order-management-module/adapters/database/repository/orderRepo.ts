import { BaseRepo } from "../../../../shared/database/repository/baseRepo";
import OrderModel from "../../../database/models/orders";
import { injectable } from "inversify";
import { IOrderRepo } from "../../../domain/ports/IOrderRepo";

@injectable()
export class OrderRepo extends BaseRepo implements IOrderRepo {
  constructor() {
    super(OrderModel);
  }
}
