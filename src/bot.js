import { Telegraf } from "telegraf";
import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";

// Import commands
import startCommand from "./commands/start.js";
import helpCommand from "./commands/help.js";
import ccrCommand from "./commands/ponte.js";
import ponteOnCommand from "./commands/ponteOn.js";
import ponteOffCommand from "./commands/ponteOff.js";


import { scheduleDailyJob } from "./scheduler/dailyJob.js";

const bot = new Telegraf(config.botToken);

// Register commands
[startCommand, 
  helpCommand, 
  ccrCommand, 
  ponteOnCommand, 
  ponteOffCommand].forEach((cmd) => cmd(bot));

// Schedule daily job
scheduleDailyJob(bot);

// Error handling
bot.catch((err, ctx) => {
  logger.error(`Bot error for ${ctx.updateType}`, err);
});

export default bot;
