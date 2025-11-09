import { removeSubscriber } from "../services/subscriptionService.js";
import { t } from "../utils/i18n.js";

export default (bot) => {
  bot.command("ponte_off", (ctx) => {
    removeSubscriber(ctx.chat.id);
    ctx.reply(t(ctx, "bridge.notify_off"));
  });
};
