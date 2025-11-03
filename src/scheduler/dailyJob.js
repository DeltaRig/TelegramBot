import cron from "node-cron";
import { getSubscribers } from "../services/subscriptionService.js";
import { getPonteStatus } from "../services/ccrService.js";
import { logger } from "../utils/logger.js";

/**
 * @param {import('telegraf').Telegraf} bot
 */
export function scheduleDailyJob(bot) {
  const task = cron.schedule("05 8 * * *", async () => {
    const subscribers = getSubscribers();
    if (!subscribers.length) return;

    const status = await getPonteStatus();

    for (const chatId of subscribers) {
      await bot.telegram.sendMessage(chatId, `📢 Atualização diária:\n${status}`);
    }
  });

  return task;
}
