import { addSubscriber } from "../services/subscriptionService.js";
import { t } from "../utils/i18n.js";

export default (bot) => {
  bot.command("ponte_on", (ctx) => {
    addSubscriber(ctx.chat.id);
    ctx.reply(t(ctx, "bridge.notify_on"));
  });
};
