import { CronJob } from "cron";
import { API_URL, API_ACCESS_KEY } from "..";
import { EVERY_TWO_MINUTES, JOB_TIME_ZONE } from "../constants";
import cfetch from "cross-fetch";

export const aggregateLeaderboardJob = new CronJob(
  EVERY_TWO_MINUTES,
  async () => {
    try {
      const aggregateReq = await cfetch(`${API_URL}/aggregateleaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_ACCESS_KEY,
        }),
      });
      if (!aggregateReq.ok) {
        throw "Error sending aggregateLeaderboard request";
      }
      console.log("Aggregated leaderboard");
    } catch (e) {
      console.error(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
