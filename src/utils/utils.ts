import { bot } from "..";
import { BOT_LOG_CHANNEL, LOG_ERRORS } from "../constants";

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
  if (!logChannel || !LOG_ERRORS) {
    console.log(
      `Could not locate log channel or logging is off (is currently ${LOG_ERRORS})! Tried to report error: `,
      stringifiedError,
    );
    return;
  }
  await logChannel.send(stringifiedError);
}
