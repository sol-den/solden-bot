import fetch from "cross-fetch";
import { SlashCommandBuilder } from "discord.js";

import { API_ACCESS_KEY, API_URL } from "..";
import { QUELLEN_ID } from "../constants";
import { Command } from "../types";

export const snapshotLeaderboardCommand: Command = {
  data: new SlashCommandBuilder().setName("snapshot-lb").setDescription("Take a snapshot of the LB (Quellen Only)"),
  async execute(interaction) {
    try {
      const author = interaction.user.id;
      if (author !== QUELLEN_ID) {
        await interaction.reply({
          content: "You do not have permission to do this!",
          ephemeral: true,
        });
        return;
      }

      await interaction.deferReply({
        ephemeral: true,
      });
      const lbSnapshotReq = await fetch(`${API_URL}/snapshotleaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: API_ACCESS_KEY,
        }),
      });
      if (!lbSnapshotReq.ok) {
        throw "Error sending snapshotLeaderboard request";
      }

      await interaction.followUp({
        content: "Leaderboard snapshot taken!",
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } finally {
      // Do any cleanup here, if needed.
    }
  },
};
