import { Telegraf } from 'telegraf';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const BOT_TOKEN = process.env.BOT_TOKEN;
const MINI_APP_URL = process.env.MINI_APP_URL;
const WEBHOOK_PATH = `/webhook/${BOT_TOKEN}`;
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const DIST_PATH = path.join(ROOT_DIR, 'dist');

if (!BOT_TOKEN || !MINI_APP_URL) {
    console.error("❌ Error: BOT_TOKEN or MINI_APP_URL environment secrets are missing.");
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(bot.webhookCallback(WEBHOOK_PATH));

app.use(express.static(DIST_PATH));
console.log(`✅ Serving static files from: ${DIST_PATH}`);

bot.start(async (ctx) => {
    const userName = ctx.from.first_name || 'valued customer';
    const welcomeMessage = `👋 Welcome, ${userName}, to the Video Shop! 
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

async function startProductionBot() {
    try {
        const fullWebhookUrl = `${MINI_APP_URL}${WEBHOOK_PATH}`;

        const setHook = await bot.telegram.setWebhook(fullWebhookUrl);

        if (setHook) {
            console.log(`✅ Telegram Webhook set successfully to: ${fullWebhookUrl}`);
        } else {
            console.error("❌ Failed to set Telegram Webhook via API call.");
        }

        app.listen(PORT, () => {
            console.log(`🌐 Server is running and listening on port ${PORT}`);
            console.log(`Video Shop Bot (Webhook Mode) is active.`);
        });

    } catch (error) {
        console.error('Fatal error during setup:', error);
        process.exit(1);
    }
}

void startProductionBot();

process.once('SIGINT', () => { bot.stop('SIGINT'); process.exit(0); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); process.exit(0); });