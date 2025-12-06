export function setupBotCommands(bot, MINI_APP_URL) {
    bot.start(async (ctx) => {
        const userName = ctx.from.first_name || 'valued customer';
        const welcomeMessage = `👋 Welcome, ${userName}, to the Product Shop!
You can browse and purchase exclusive video content right here in Telegram.

Click the button below to open the catalog.`;

        const keyboard = {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: '🚀 Open Catalog',
                        web_app: {
                            url: MINI_APP_URL
                        }
                    }]
                ]
            }
        };

        await ctx.reply(welcomeMessage, keyboard);
    });
}
