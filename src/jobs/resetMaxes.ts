import { CronJob } from "cron";
import { API_URL, API_ACCESS_KEY } from "..";
import { EVERY_DAY_AT_NOON, JOB_TIME_ZONE } from "../constants";
import cfetch from "cross-fetch";

export const resetMaxesJob = new CronJob(
  EVERY_DAY_AT_NOON,
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
        console.log("Error sending resetMax request");
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
