import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const testCommand: Command = {
  data: new SlashCommandBuilder().setName("test").setDescription("Test command"),
  async execute(interaction) {
    try {
      await interaction.deferReply();
      await sleep(1000);
      await interaction.followUp("Test command executed!");
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
