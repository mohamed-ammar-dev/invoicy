import { Request, Response } from "express";
import { diContainer } from "../../../../config/inversify.config";
import { DI_TYPES } from "../../../../shared/types/di";
import { sendResponse } from "../../../../shared/utils/sendResponse";
import { IUserAuthCoreService } from "../../../interfaces/IUserAuthCoreService";

export class UserAuthController {
  async register(request: Request, response: Response) {
    const userAuthCoreService = diContainer.get<IUserAuthCoreService>(
      DI_TYPES.UserAuthCoreService
    );

    const user = await userAuthCoreService.register(request.body);

    response.cookie("token", user.accessToken, {
      signed: true,
      maxAge: 86400000,
      httpOnly: true,
    });

    response.cookie("user", user.name, { maxAge: 86400000 * 2 });
    response.cookie("isAuth", true, { maxAge: 86400000 * 2 });

    sendResponse(response);
  }

  async login(request: Request, response: Response) {
    const userAuthCoreService = diContainer.get<IUserAuthCoreService>(
      DI_TYPES.UserAuthCoreService
    );
    const user = await userAuthCoreService.login(request.body);

    response.cookie("token", user.accessToken, {
      signed: true,
      maxAge: 86400000,
      httpOnly: true,
    });

    response.cookie("user", user.name, { maxAge: 86400000 * 2 });
    response.cookie("isAuth", true, { maxAge: 86400000 * 2 });

    sendResponse(response);
  }

  async sendForgetPasswordCode(request: Request, response: Response) {
    const userAuthCoreService = diContainer.get<IUserAuthCoreService>(
      DI_TYPES.UserAuthCoreService
    );

    await userAuthCoreService.sendForgetPasswordCode({
      email: request.body.email,
      code: request.body.code,
    });

    sendResponse(response);
  }

  async validateForgetPasswordCode(request: Request, response: Response) {
    const userAuthCoreService = diContainer.get<IUserAuthCoreService>(
      DI_TYPES.UserAuthCoreService
    );

    await userAuthCoreService.validateForgetPasswordCode({
      email: request.body.email,
      code: request.body.code,
    });

    sendResponse(response);
  }

  async resetPassword(request: Request, response: Response) {
    const userAuthCoreService = diContainer.get<IUserAuthCoreService>(
      DI_TYPES.UserAuthCoreService
    );

    await userAuthCoreService.resetPassword({
      newPassword: request.body.newPassword,
      email: request.body.email,
      code: request.body.code,
    });

    response.clearCookie("email");

    sendResponse(response);
  }

  async logout(request: Request, response: Response) {
    response.clearCookie("user");
    response.clearCookie("token");

    sendResponse(response);
  }
}
