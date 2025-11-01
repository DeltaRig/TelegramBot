import cron from "node-cron";
import { getSubscribers } from "../services/subscriptionService.js";
import { getPonteStatus } from "../services/ccrService.js";
import { logger } from "../utils/logger.js";

/**
 * @param {import('telegraf').Telegraf} bot
 */
export function scheduleDailyJob(bot) {
  // Every day at 8:00 AM (server time)
  cron.schedule("0 8 * * *", async () => {
    logger.info("🔔 Executando verificação diária da Ponte do Guaíba (08h00)");
    const subscribers = getSubscribers();
    if (!subscribers.length) {
      logger.info("Nenhum inscrito para notificações da ponte.");
      return;
    }

    const status = await getPonteStatus();

    for (const chatId of subscribers) {
      try { 
        await bot.telegram.sendMessage(chatId, `📢 Atualização diária:\n${status}`);
      } catch (err) {
        logger.error(`Erro ao enviar mensagem para ${chatId}:`, err.message);
      }
    }
  });
  return task;
}
