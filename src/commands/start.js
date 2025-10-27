export default (bot) => {
  bot.start((ctx) => {
    ctx.reply(`👋 Hello ${ctx.from.first_name}! Welcome to the bot.`);
  });
};
