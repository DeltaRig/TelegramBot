import { removeSubscriber } from "../services/subscriptionService.js";

export default (bot) => {
  bot.command("ponte_off", (ctx) => {
    removeSubscriber(ctx.chat.id);
    ctx.reply("🚫 Você não receberá mais atualizações diárias da Ponte do Guaíba.");
  });
};
