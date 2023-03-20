import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { commands } from "./commands/commandList";
import { BOT_LOG_CHANNEL } from "./constants";
import { reprocessJob } from "./jobs/reprocessFailed";
import { resetMaxesJob } from "./jobs/resetMaxes";

require("dotenv").config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
const SOLDEN_GUILD = process.env.SOLDEN_GUILD!;
const CLIENT_ID = process.env.CLIENT_ID!;
export const API_URL = process.env.API_URL!;
export const API_ACCESS_KEY = process.env.API_ACCESS_KEY!;

export const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register commands
async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  const apiReqCmds = commands.map((cmd) => cmd.data.toJSON());
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, SOLDEN_GUILD), {
    body: apiReqCmds,
  });
}

registerCommands();

bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;
  try {
    const command = commands.find((cmd) => cmd.data.name === interaction.commandName);
    if (!command) return;
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

bot.on("ready", () => {
  console.log("Bot is ready!");
});

bot.on("error", async (error) => {
  const logChannel = await bot.channels.fetch(BOT_LOG_CHANNEL);
  if (!logChannel) {
    console.log("Could not locate log channel!");
  }
});

// Register jobs and start them all
reprocessJob.start();
resetMaxesJob.start();

bot.login(DISCORD_TOKEN);
