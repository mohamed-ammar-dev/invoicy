import {
  OrderItem,
  FindAttributeOptions,
  IncludeOptions,
  ProjectionAlias,
} from "sequelize/types";
import { Fn } from "sequelize/types/utils";

export type find = {
  condition?: object;
  attributes?: FindAttributeOptions | Array<Fn>;
  order?: [OrderItem];
  include?: IncludeOptions | Array<IncludeOptions>;
  group?: string[];
};

export type findOne = {
  condition: object;
  attributes?: FindAttributeOptions | Array<Fn>;
  include?: IncludeOptions;
  order?: [OrderItem];
};

export type findWithPagination = {
  condition: object;
  order: OrderItem;
  limit?: number;
  page?: number;
  attributes?: FindAttributeOptions | ProjectionAlias | string;
  include?: IncludeOptions;
};

export type update = {
  condition: object;
  update: object;
};

export type upsert = {
  update: object;
};

export type destroy = {
  condition: object;
};
