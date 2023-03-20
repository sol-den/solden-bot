import { CronJob } from "cron";
import { API_URL, API_ACCESS_KEY } from "..";
import { EVERY_TWO_MINUTES, JOB_TIME_ZONE } from "../constants";
import cfetch from "cross-fetch";

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
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
