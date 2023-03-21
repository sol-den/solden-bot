import { CronJob } from "cron";

import { JOB_TIME_ZONE } from "../constants";
import { handleError } from "../utils/utils";

export const testJob = new CronJob(
  "28 23 * * *",
  async () => {
    try {
      console.log("Template job ran!");
    } catch (e) {
      console.error(e);
      handleError(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
