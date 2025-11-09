import cron from "node-cron";
import { getSubscribers } from "../services/subscriptionService.js";
import { getPonteStatus } from "../services/ccrService.js";
import { logger } from "../utils/logger.js";
import { t } from "../utils/i18n.js";


const lastStatus = "";
/**
 * @param {import('telegraf').Telegraf} bot
 */
export function updateStatus(bot) {
  try {
    const task = cron.schedule("0/5 * * * *", async () => {
      const subscribers = getSubscribers();
      if (!subscribers.length) return;

      const status = await getPonteStatus();

      if (status !== lastStatus) {
        for (const chatId of subscribers) {
          await bot.telegram.sendMessage(chatId, t(ctx, "bridge.status_update", { status }));
        }
        lastStatus = status;
      }
    });
    return task
  } catch (error) {
    logger.error(t(ctx, "updateStatus", { error }));
  }

  return;
}
