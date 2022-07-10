import { Model, Sequelize, DataTypes } from "sequelize";
import { server } from "../../../config/server";
import { MODEL } from "../../enums/models";

const sequelize = <Sequelize>(<unknown>server.dataBaseConnection);

const ForgetPasswordModel = sequelize.define<Model>(
  MODEL.FORGET_PASSWORD,
  {
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },

    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    counter: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,

    timestamps: false,

    indexes: [
      {
        fields: ["userId"],
      },
      {
        fields: ["identifier"],
      },
    ],
  }
);

export { ForgetPasswordModel };
