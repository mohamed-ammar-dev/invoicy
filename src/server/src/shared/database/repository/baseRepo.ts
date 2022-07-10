import { injectable, unmanaged } from "inversify";
import { Model, ModelStatic, Optional } from "sequelize";
import { IBaseRepo } from "../../interfaces/IBaseRepo";
import "reflect-metadata";

@injectable()
export abstract class BaseRepo implements IBaseRepo {
  private collectionInstance: ModelStatic<Model<any, any>>;

  constructor(@unmanaged() collectionInstance: ModelStatic<Model<any, any>>) {
    this.collectionInstance = collectionInstance;
  }

  async create(params: Optional<any, string>) {
    const newRecord: any = await this.collectionInstance.create(params);
    return newRecord.dataValues;
  }

  async bulkCreate(params: any) {
    return await this.collectionInstance.bulkCreate(params);
  }

  async upsert(params: Optional<any, string>) {
    const updatedData = params.update;
    const updates: any = await this.collectionInstance.upsert(updatedData);

    return updates[0].dataValues;
  }

  async update(params: Optional<any, string>) {
    const condition = params.condition;
    const updatedData = params.update;

    return await this.collectionInstance.update(updatedData, {
      where: condition,
    });
  }

  async findOne(params: Optional<any, string>): Promise<any> {
    const condition = params.condition;
    const attributes = params.attributes;
    const include = params.include;
    const order = params.order;

    return await this.collectionInstance.findOne({
      where: condition,
      attributes,
      include,
      order,
      raw: true,
      nest: true,
      logging: console.log,
    });
  }

  async findWithPagination(params: Optional<any, string>) {
    const condition = params.condition;
    const attributes = params.attributes;
    const limit = params.limit || 10;
    const page = params.page || 0;
    const offset =
      page != undefined && limit != undefined ? limit * page : undefined;
    const order = params.order;
    const include = params.include;

    return await this.collectionInstance.findAll({
      where: condition,
      limit,
      offset,
      order: [order],
      attributes,
      include,
    });
  }

  async find(params: Optional<any, string>): Promise<any> {
    const condition = params.condition;
    const attributes = params.attributes;
    const include = params.include;
    const group = params.group;
    const order = params.order;

    return await this.collectionInstance.findAll({
      where: condition,
      attributes,
      include,
      order,
      raw: true,
      nest: true,
      group,
    });
  }

  async delete(params: Optional<any, string>) {
    const condition = params.condition;

    return await this.collectionInstance.destroy({
      where: condition,
    });
  }
}
