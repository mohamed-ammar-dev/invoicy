import { DataTypes, Model, Sequelize } from "sequelize";
import { server } from "../../../config/server";
import { MODEL } from "../../enums/models";
import { ORDER_STATUS } from "../../enums/orderStatus";
import { PAYMENT_METHOD } from "../../enums/paymentMethods";

const sequelize = <Sequelize>(<unknown>server.dataBaseConnection);

const OrderModel = sequelize.define<Model>(
  MODEL.ORDER,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    orderName: { type: DataTypes.STRING, allowNull: false },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    providerOrderId: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM(
        ORDER_STATUS.INITIALIZED,
        ORDER_STATUS.VERIFIED,
        ORDER_STATUS.NOT_VERIFIED,
        ORDER_STATUS.PAID,
        ORDER_STATUS.UNPAID
      ),
      defaultValue: ORDER_STATUS.INITIALIZED,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    paymentMethod: {
      type: DataTypes.ENUM(PAYMENT_METHOD.CREDIT_CARD, PAYMENT_METHOD.WALLET),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default OrderModel;
