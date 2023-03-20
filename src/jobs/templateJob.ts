import { CronJob } from "cron";
import { EVERY_DAY_AT_MIDNIGHT, JOB_TIME_ZONE } from "../constants";

export const templateJob = new CronJob(
  EVERY_DAY_AT_MIDNIGHT,
  async () => {
    try {
      // Do Stuff
    } catch (e) {
      console.error(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
