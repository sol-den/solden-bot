import { CronJob } from "cron";
import { JOB_TIME_ZONE } from "../constants";

export const testJob = new CronJob(
  "28 23 * * *",
  async () => {
    try {
      console.log("Template job ran!");
    } catch (e) {
      console.error(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
