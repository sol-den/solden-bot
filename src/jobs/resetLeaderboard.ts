import { CronJob } from "cron";
import cfetch from "cross-fetch";
import { APIEmbedField, EmbedBuilder, RestOrArray } from "discord.js";

import { API_ACCESS_KEY, API_URL, TOP_10_CHANNEL } from "..";
import { ADMIN_ROLE, EVERT_FRIDAY_AT_NOON, JOB_TIME_ZONE, MOD_ROLE } from "../constants";
import { getTextChannel, handleError } from "../utils/utils";

export const resetLeaderboardJob = new CronJob(
  EVERT_FRIDAY_AT_NOON,
  async () => {
    try {
      const top10Fighters = await cfetch(`${API_URL}/gettopten`);
      if (!top10Fighters.ok) {
        console.log("Error fetching top 10 fighters for this week. Will still attempt to reset the leaderboard");
      }
      const top10Data: string[] = await top10Fighters.json();
      console.log("Top 10 fighters for this week: ", top10Data);

      const embed = new EmbedBuilder();
      embed.setTitle(`Top 10 Leaderboard for ${new Date().toLocaleDateString("UK")}`);
      embed.setColor(0xff7b00);

      const formattedTop10Wallets: RestOrArray<APIEmbedField> = top10Data.map((wallet, index) => ({
        name: `#${index + 1}`,
        value: wallet,
        inline: false,
      }));
      embed.setFields(...formattedTop10Wallets);

      const leaderboardChannel = getTextChannel(TOP_10_CHANNEL);
      if (leaderboardChannel) {
        try {
          void leaderboardChannel.send({
            content: `<@&${ADMIN_ROLE}> <@&${MOD_ROLE}>`,
            embeds: [embed],
          });
        } catch (e) {
          console.log("Could not send leaderboard message");
          handleError(e);
        }
        const resetLeaderboardReq = await cfetch(`${API_URL}/snapshotleaderboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: API_ACCESS_KEY,
          }),
        });
        if (!resetLeaderboardReq.ok) {
          throw "Error resetting leaderboard";
        }
      } else {
        console.log("Could not find leaderboard channel");
      }
    } catch (e) {
      console.error(e);
      void handleError(e);
    }
  },
  null,
  false,
  JOB_TIME_ZONE,
);
