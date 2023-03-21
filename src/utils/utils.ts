import { bot } from "..";
import { BOT_LOG_CHANNEL } from "../constants";

export function getTextChannel(id: string) {
  const channel = bot.channels.cache.get(id);
  if (channel?.isTextBased()) {
    return channel;
  }
  return null;
}

export async function handleError(e: unknown) {
  const stringifiedError = String(e);
  const logChannel = getTextChannel(BOT_LOG_CHANNEL);
  if (!logChannel) {
    console.log("Could not locate log channel! Tried to report error: ", stringifiedError);
    return;
  }
  await logChannel.send(stringifiedError);
}
