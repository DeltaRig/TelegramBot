import bot from "./bot.js";
import { logger } from "./utils/logger.js";

(async () => {
  try {
    logger.info("🤖 Starting bot...");
    await bot.launch();
    logger.info("✅ Bot is up and running!");
  } catch (error) {
    logger.error("❌ Failed to start bot:", error);
  }

  // Graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
})();
