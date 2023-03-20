import { CronJob } from "cron";
import { EVERY_DAY_AT_MIDNIGHT, JOB_TIME_ZONE } from "../constants";
import cfetch from "cross-fetch";
import { API_URL } from "..";

export const resetLeaderboardJob = new CronJob(
  EVERY_DAY_AT_MIDNIGHT,
  async () => {
    try {
      const top10Fighters = await cfetch(`${API_URL}/gettopten`);
      if (!top10Fighters.ok) {
        console.log("Error fetching top 10 fighters for this week. Will still attempt to reset the leaderboard");
      }
      const top10Data = await top10Fighters.json();
    } catch (e) {
      console.error(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
