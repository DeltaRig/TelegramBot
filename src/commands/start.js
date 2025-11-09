// src/commands/start.js
import { t } from "../utils/i18n.js";

export default function startCommand(bot) {
  bot.start(async (ctx) => {
    await ctx.reply(t(ctx, "welcome", { name: ctx.from.first_name }));
 });
}
