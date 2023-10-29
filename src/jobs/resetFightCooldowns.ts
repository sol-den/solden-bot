import { CronJob } from "cron";
import cfetch from "cross-fetch";

import { API_ACCESS_KEY, API_URL } from "..";
import { EVERY_TWO_MINUTES, JOB_TIME_ZONE } from "../constants";
import { handleError } from "../utils/utils";

export const resetFightCooldownsJob = new CronJob(
  EVERY_TWO_MINUTES,
  async () => {
    try {
      const templateReq = await cfetch(`${API_URL}/clearfightcooldowns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_ACCESS_KEY,
        }),
      });
      if (!templateReq.ok) {
        throw "Error sending clearfightcooldowns request";
      }
      console.log("Cleared fight cooldowns");
    } catch (e) {
      console.error(e);
      handleError(e).catch(console.error);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
