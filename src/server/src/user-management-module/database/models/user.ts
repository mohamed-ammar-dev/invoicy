import { Model, Sequelize, DataTypes } from "sequelize";
import { server } from "../../../config/server";
import { MODEL } from "../../enums/models";
import { ForgetPasswordModel } from "./forgetPassword";

const sequelize = <Sequelize>(<unknown>server.dataBaseConnection);

const UserModel = sequelize.define<Model>(
  MODEL.USER,
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,

    timestamps: false,

    indexes: [
      {
        fields: ["id"],
      },
      {
        fields: ["email"],
      },
    ],
  }
);

UserModel.hasOne(ForgetPasswordModel, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
ForgetPasswordModel.belongsTo(UserModel, {
  foreignKey: { name: "userId", allowNull: false },
});

export { UserModel };

import "../triggers/user";
