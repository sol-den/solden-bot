import { CronJob } from "cron";
import cfetch from "cross-fetch";

import { API_ACCESS_KEY, API_URL } from "..";
import { EVERY_DAY_AT_MIDNIGHT, JOB_TIME_ZONE } from "../constants";

export const resetMaxesJob = new CronJob(
  EVERY_DAY_AT_MIDNIGHT,
  async () => {
    try {
      const resetMaxReq = await cfetch(`${API_URL}/resetmax`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_ACCESS_KEY,
        }),
      });

      if (!resetMaxReq.ok) {
        throw "Error sending resetMax request";
      }
      console.log("Reset maxes");
    } catch (e) {
      console.error(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
