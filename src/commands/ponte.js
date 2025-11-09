import { getPonteStatus } from "../services/ccrService.js";
import { t } from "../utils/i18n.js";

export default (bot) => {
  bot.command("ponte", async (ctx) => {
    await ctx.reply(t(ctx, "bridge.consulting"));
    const status = await getPonteStatus();
    await ctx.reply(status);
  });
};
