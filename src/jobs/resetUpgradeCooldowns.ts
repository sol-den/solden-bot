import { CronJob } from "cron";
import { API_ACCESS_KEY, API_URL } from "..";
import { EVERY_SATURDAY_AT_MIDNIGHT, JOB_TIME_ZONE } from "../constants";
import cfetch from "cross-fetch";

export const resetUpgradeCooldownsJob = new CronJob(
  EVERY_SATURDAY_AT_MIDNIGHT,
  async () => {
    try {
      const resetUpgradeCooldownsReq = await cfetch(`${API_URL}/clearupgradecooldowns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_ACCESS_KEY,
        }),
      });
      if (!resetUpgradeCooldownsReq.ok) {
        console.log("Error sending resetUpgradeCooldowns request");
        return;
      }
      console.log("Reset upgrade cooldowns");
    } catch (e) {
      console.error(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
