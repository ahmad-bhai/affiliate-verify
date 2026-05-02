const { Telegraf } = require('telegraf');

// Aapka Bot Token
const bot = new Telegraf('8665975211:AAHU-hIZ_GX_7HviYvYGmyboY6yUBwBQpZ0');

bot.start((ctx) => {
    // User ka first name nikalne ke liye
    const firstName = ctx.from.first_name || "User";

    // Message send karne ke liye (Markdown enabled)
    ctx.replyWithMarkdown(
        `👋*Hy Dear ${firstName}*\n\n` +
        `*Please enter your Quotex Account ID (only numbers), after successful verification we will add you to the VIP group*`
    );
});

// Bot ko start karne ke liye
bot.launch().then(() => {
    console.log("🚀 Bot is running... No Ads! Powered by Node.js");
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
