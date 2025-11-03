import { addSubscriber } from "../services/subscriptionService.js";

export default (bot) => {
  bot.command("ponte_on", (ctx) => {
    addSubscriber(ctx.chat.id);
    ctx.reply("✅ Você vai receber atualizações da Ponte do Guaíba todos os dias.");
  });
};
