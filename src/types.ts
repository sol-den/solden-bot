import { RepliableInteraction, SlashCommandBuilder } from "discord.js";

export type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: RepliableInteraction) => Promise<void>;
};
