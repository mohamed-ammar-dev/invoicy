import { Container } from "inversify";
import { OrderRepo } from "../order-management-module/adapters/database/repository/orderRepo";
import { IOrderRepo } from "../order-management-module/domain/ports/IOrderRepo";
import { INotifier } from "../shared/interfaces/INotifier";
import { MailService } from "../shared/mailService/mailService";
import { DI_TYPES } from "../shared/types/di";
import { ForgetPasswordRepo } from "../user-management-module/adapters/database/repository/forgetPasswordRepo";
import { UserRepo } from "../user-management-module/adapters/database/repository/userRepo";
import { UserAuthCoreService } from "../user-management-module/domain/core/auth/authCoreService";
import { IForgetPasswordRepo } from "../user-management-module/domain/ports/auth/IForgetPasswordRepo";
import { IUserRepo } from "../user-management-module/domain/ports/user/IUserRepo";
import { IOrderCoreService } from "../order-management-module/interfaces/IOrderCoreService";
import { IUserAuthCoreService } from "../user-management-module/interfaces/IUserAuthCoreService";
import { OrderCoreService } from "../order-management-module/domain/core/orderCoreService";

const diContainer = new Container();

diContainer
  .bind<IUserAuthCoreService>(DI_TYPES.UserAuthCoreService)
  .to(UserAuthCoreService);
diContainer
  .bind<IOrderCoreService>(DI_TYPES.OrderCoreService)
  .to(OrderCoreService);

diContainer.bind<INotifier>(DI_TYPES.MailService).to(MailService);

diContainer
  .bind<IForgetPasswordRepo>(DI_TYPES.ForgetPasswordRepo)
  .to(ForgetPasswordRepo)
  .inSingletonScope();
diContainer.bind<IUserRepo>(DI_TYPES.UserRepo).to(UserRepo).inSingletonScope();
diContainer
  .bind<IOrderRepo>(DI_TYPES.OrderRepo)
  .to(OrderRepo)
  .inSingletonScope();

export { diContainer };
