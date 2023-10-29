import { CronJob } from "cron";
import cfetch from "cross-fetch";

import { API_ACCESS_KEY, API_URL } from "..";
import { EVERT_FRIDAY_AT_NOON, JOB_TIME_ZONE } from "../constants";
import { handleError } from "../utils/utils";

export const resetMaxesJob = new CronJob(
  EVERT_FRIDAY_AT_NOON,
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
      handleError(e).catch(console.error);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
