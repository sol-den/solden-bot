import { CronJob } from "cron";

import { EVERY_DAY_AT_MIDNIGHT, JOB_TIME_ZONE } from "../constants";
import { handleError } from "../utils/utils";

export const templateJob = new CronJob(
  EVERY_DAY_AT_MIDNIGHT,
  async () => {
    try {
      // Do Stuff
    } catch (e) {
      console.error(e);
      handleError(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
