import { fetch as cfetch } from "cross-fetch";
import { SlashCommandBuilder } from "discord.js";

import { API_ACCESS_KEY, API_URL } from "..";
import { QUELLEN_ID } from "../constants";
import { Command } from "../types";

export const reprocessFailedCommand: Command = {
  data: new SlashCommandBuilder().setName("reprocess-failed").setDescription("(Quellen Only)"),
  async execute(interaction) {
    try {
      if (interaction.user.id !== QUELLEN_ID) {
        await interaction.reply("You are not allowed to use this command!");
        return;
      }
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
      await interaction.reply("Reprocessing failed upgrade transactions");
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
