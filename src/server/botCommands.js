import { Product } from './database.js';

/**
 * Sets up bot commands
 * @param bot
 * @param MINI_APP_URL
 */
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

    bot.help(async (ctx) => {
        await ctx.reply(
            '📚 Available commands:\n\n' +
            '/start - Welcome message and open catalog\n' +
            '/help - Show this help message\n' +
            '/products - List all products\n' +
            '/search <keyword> - Search for products\n\n' +
            'Or just type your question about products!'
        );
    });

    bot.command('products', async (ctx) => {
        try {
            const products = await Product.find({}).limit(10);

            if (products.length === 0) {
                await ctx.reply('No products available at the moment.');
                return;
            }

            let message = '🛍️ Available Products:\n\n';
            products.forEach((product, index) => {
                const doc = product.toObject();
                message += `${index + 1}. ${doc.name || doc.title || 'Product'}\n`;
                if (doc.price) message += `   💰 $${doc.price}\n`;
                if (doc.description) message += `   📝 ${doc.description.substring(0, 50)}...\n`;
                message += '\n';
            });

            await ctx.reply(message);
        } catch (error) {
            console.error('Error fetching products:', error);
            await ctx.reply('Sorry, I couldn\'t fetch the products. Please try again later.');
        }
    });
    bot.command('search', async (ctx) => {
        const searchQuery = ctx.message.text.split(' ').slice(1).join(' ');

        if (!searchQuery) {
            await ctx.reply('Please provide a search term. Example: /search video');
            return;
        }

        try {
            const products = await Product.find({
                $or: [
                    { name: { $regex: searchQuery, $options: 'i' } },
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            }).limit(5);

            if (products.length === 0) {
                await ctx.reply(`No products found for "${searchQuery}".`);
                return;
            }

            let message = `🔍 Search results for "${searchQuery}":\n\n`;
            products.forEach((product, index) => {
                const doc = product.toObject();
                message += `${index + 1}. ${doc.name || doc.title || 'Product'}\n`;
                if (doc.price) message += `   💰 $${doc.price}\n`;
                message += '\n';
            });

            await ctx.reply(message);
        } catch (error) {
            console.error('Error searching products:', error);
            await ctx.reply('Sorry, search failed. Please try again.');
        }
    });
    bot.on('text', async (ctx) => {
        const message = ctx.message.text.toLowerCase();

        if (message.startsWith('/')) return;

        if (message.includes('product') || message.includes('buy') ||
            message.includes('price') || message.includes('what') ||
            message.includes('how') || message.includes('catalog')) {

            try {
                const products = await Product.find({}).limit(3);

                if (products.length === 0) {
                    await ctx.reply('We currently have no products available. Please check back later!');
                    return;
                }

                let response = '🛍️ Here are some of our products:\n\n';
                products.forEach((product, index) => {
                    const doc = product.toObject();
                    response += `${index + 1}. ${doc.name || doc.title || 'Product'}`;
                    if (doc.price) response += ` - $${doc.price}`;
                    response += '\n';
                });

                response += '\nUse /products to see all items or click the button below to browse:';

                const keyboard = {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: '🚀 Open Catalog',
                                web_app: { url: MINI_APP_URL }
                            }]
                        ]
                    }
                };

                await ctx.reply(response, keyboard);
            } catch (error) {
                console.error('Error handling text message:', error);
                await ctx.reply('I\'m here to help with product questions! Use /help to see available commands.');
            }
        } else {
            await ctx.reply(
                'I\'m a product bot! Ask me about products, prices, or use /help to see what I can do.'
            );
        }
    });
}
