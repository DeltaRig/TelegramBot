import cron from "node-cron";
import { getSubscribers } from "../services/subscriptionService.js";
import { getPonteStatus } from "../services/ccrService.js";
import { logger } from "../utils/logger.js";


const lastStatus = "";
/**
 * @param {import('telegraf').Telegraf} bot
 */
export function updateStatus(bot) {
  const task = cron.schedule("10 * * * *", async () => {
    const subscribers = getSubscribers();
    if (!subscribers.length) return;

    const status = await getPonteStatus();

    if (status !== lastStatus) {
      for (const chatId of subscribers) {
        await bot.telegram.sendMessage(chatId, `📢 Atualização da ponte:\n${status}`);
      }
      lastStatus = status;
    }
  });

  return task;
}
