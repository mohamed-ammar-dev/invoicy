import authHelper from "../../domain/core/helpers/authHelper";
import { UserModel } from "../models/user";

UserModel.beforeCreate(async (user: any) => {
  user.password = await authHelper.hashPassword(user.password);

  user.email = user.email.toLowerCase();
});

UserModel.beforeBulkUpdate(async (user: any) => {
  if (user.attributes?.password)
    user.attributes.password = await authHelper.hashPassword(
      user.attributes.password
    );

  if (user.attributes?.email)
    user.attributes.email = user.attributes.email.toLowerCase();
});
