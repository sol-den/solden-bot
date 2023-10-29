import { Command } from "../types";
import { reprocessFailedCommand } from "./reprocessFailed";
import { snapshotLeaderboardCommand } from "./snapshotLeaderboard";

/**
 * Add new commands here to register them
 */
export const commands: Command[] = [snapshotLeaderboardCommand, reprocessFailedCommand];
