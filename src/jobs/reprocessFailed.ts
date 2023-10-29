import { CronJob } from "cron";
import cfetch from "cross-fetch";

import { API_ACCESS_KEY, API_URL } from "..";
import { EVERY_DAY_AT_MIDNIGHT, JOB_TIME_ZONE } from "../constants";
import { handleError } from "../utils/utils";

export const reprocessJob = new CronJob(
  EVERY_DAY_AT_MIDNIGHT,
  async () => {
    try {
      const reprocessReq = await cfetch(`${API_URL}/reprocessfailed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_ACCESS_KEY,
        }),
      });

      if (!reprocessReq.ok) {
        throw "Error sending reprocess request";
      }
      console.log("Reprocessing failed upgrade transactions");
    } catch (e) {
      console.error(e);
      handleError(e).catch(console.error);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
