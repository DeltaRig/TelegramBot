import { Telegraf } from "telegraf";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";

// Import commands
import startCommand from "./commands/start.js";
import helpCommand from "./commands/help.js";
import ccrCommand from "./commands/ccr.js";

const bot = new Telegraf(config.botToken);

// Register commands
[startCommand, helpCommand, ccrCommand].forEach((cmd) => cmd(bot));

// Error handling
bot.catch((err, ctx) => {
  logger.error(`Bot error for ${ctx.updateType}`, err);
});

export default bot;
