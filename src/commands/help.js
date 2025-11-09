// src/commands/help.js
import { t } from "../utils/i18n.js";

export default (bot) => {
  bot.help((ctx) => {
    ctx.reply(t(ctx, "help"));
  });
};
