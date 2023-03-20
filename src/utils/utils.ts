import { bot } from "..";

export function getTextChannel(id: string) {
  const channel = bot.channels.cache.get(id);
  if (channel?.isTextBased()) {
    return channel;
  }
  return null;
}
