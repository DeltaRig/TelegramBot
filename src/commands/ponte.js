import { getPonteStatus } from "../services/ccrService.js";

export default (bot) => {
  bot.command("ponte", async (ctx) => {
    await ctx.reply("⏳ Consultando status da Ponte do Guaíba...");
    const status = await getPonteStatus();
    await ctx.reply(status);
  });
};
