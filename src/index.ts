import { fetch as cfetch } from "cross-fetch";
import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";

import { commands } from "./commands/commandList";
import { aggregateLeaderboardJob } from "./jobs/aggregateLeaderboard.ts";
import { reprocessJob } from "./jobs/reprocessFailed";
import { resetFightCooldownsJob } from "./jobs/resetFightCooldowns";
import { resetLeaderboardJob } from "./jobs/resetLeaderboard";
import { resetMaxesJob } from "./jobs/resetMaxes";
import { resetUpgradeCooldownsJob } from "./jobs/resetUpgradeCooldowns";
import { handleError } from "./utils/utils";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
require("dotenv").config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
const SOLDEN_GUILD = process.env.SOLDEN_GUILD!;
const CLIENT_ID = process.env.CLIENT_ID!;
export const API_URL = process.env.API_URL!;
export const API_ACCESS_KEY = process.env.API_ACCESS_KEY!;
export const TOP_10_CHANNEL = process.env.TOP_10_CHANNEL!;
export const BOT_LOG_CHANNEL = process.env.BOT_LOG_CHANNEL!;

export const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// Register commands
async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  const apiReqCmds = commands.map((cmd) => cmd.data.toJSON());
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, SOLDEN_GUILD), {
    body: apiReqCmds,
  });
}

registerCommands().catch(console.error);

bot.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isCommand()) {
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
  } else {
    // Can add more event handlers here (make it an else if)
    // Just return for now
    return;
  }
});

bot.on("ready", () => {
  console.log("Bot is ready!");
});

bot.on("error", async (error) => {
  console.error(error);
  await handleError(error);
});

// Register jobs and start them all
// #region
reprocessJob.start();
resetMaxesJob.start();
aggregateLeaderboardJob.start();
resetFightCooldownsJob.start();
resetLeaderboardJob.start();
resetUpgradeCooldownsJob.start();

console.log("Current time: ", new Date().toString());
console.log("Reprocess job run time: ", reprocessJob.nextDate().toString());
console.log("Reset maxes job run time: ", resetMaxesJob.nextDate().toString());
console.log("Aggregate leaderboard job run time: ", aggregateLeaderboardJob.nextDate().toString());
console.log("Reset fight cooldowns job run time: ", resetFightCooldownsJob.nextDate().toString());
console.log("Reset leaderboard job run time: ", resetLeaderboardJob.nextDate().toString());
console.log("Reset upgrade cooldowns job run time: ", resetUpgradeCooldownsJob.nextDate().toString());
// #endregion

cfetch(`${API_URL}/ping`)
  .then(() => console.log("Pinged API!"))
  .catch(console.error);

bot.login(DISCORD_TOKEN).catch(console.error);
