import { CronJob } from "cron";
import cfetch from "cross-fetch";

import { API_ACCESS_KEY, API_URL } from "..";
import { EVERT_FRIDAY_AT_NOON, JOB_TIME_ZONE } from "../constants";
import { handleError } from "../utils/utils";

export const resetUpgradeCooldownsJob = new CronJob(
  EVERT_FRIDAY_AT_NOON,
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
      handleError(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
