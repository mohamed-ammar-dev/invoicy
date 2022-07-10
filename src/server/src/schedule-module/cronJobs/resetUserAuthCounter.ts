import { CronJob } from "cron";
import { diContainer } from "../../config/inversify.config";
import { DI_TYPES } from "../../shared/types/di";
import { IUserAuthCoreService } from "../../user-management-module/interfaces/IUserAuthCoreService";

const job = new CronJob("0 0 0 * * *", async function () {
  console.log("Running cronJob: Rest Auth Counter to 0");

  const userAuthCoreService = diContainer.get<IUserAuthCoreService>(
    DI_TYPES.UserAuthCoreService
  );

  await userAuthCoreService.resetCounters();
});

job.start();
