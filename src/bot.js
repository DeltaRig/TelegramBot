import { config } from "./config/index.js";
import { logger } from "./utils/logger.js";
import { Telegraf, session } from "telegraf"; //Telegraf — the main Telegram bot framework (handles updates, messages, commands, etc.).
import { loadLanguages, t } from "./utils/i18n.js";

// Import commands
import startCommand from "./commands/start.js";
import helpCommand from "./commands/help.js";
import ccrCommand from "./commands/ponte.js";
import ponteOnCommand from "./commands/ponteOn.js";
import ponteOffCommand from "./commands/ponteOff.js";


import { updateStatus } from "./scheduler/updateStatus.js";

const bot = new Telegraf(config.botToken);


// Register commands
[startCommand, 
  helpCommand, 
  ccrCommand, 
  ponteOnCommand, 
  ponteOffCommand].forEach((cmd) => cmd(bot));

// Schedule updateStatus
updateStatus(bot);

// Error handling
bot.catch((err, ctx) => {
  logger.error(`Bot error for ${ctx.updateType}`, err);
});


// Enable session middleware
bot.use(session());
// Load languages
loadLanguages();
// Middleware to ensure every user has a default language
bot.use(async (ctx, next) => {
  if (!ctx.session.lang) {
    ctx.session.lang = "pt";
  }
  await next();
});


export default bot;
