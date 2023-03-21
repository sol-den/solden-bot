import { SlashCommandBuilder } from "discord.js";

import { Command } from "../types";

export const templateCommand: Command = {
  data: new SlashCommandBuilder().setName("templateCommand").setDescription("Template command"),
  async execute(interaction) {
    try {
      // Do everything here
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
