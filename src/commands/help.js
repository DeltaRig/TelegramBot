export default (bot) => {
  bot.help((ctx) => {
    ctx.reply("Available commands:\n/start - start bot\n/help - get help\n/ccr - check Ponte do Guaíba status");
  });
};
