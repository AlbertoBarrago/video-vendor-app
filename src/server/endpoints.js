import express from 'express';
import { Product } from './database.js';

export function setupEndpoints(bot, WEBHOOK_PATH, DIST_PATH) {
    const app = express();

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/api/products', async (req, res) => {
        try {
            const products = await Product.find({});
            const transformed = products.map(p => {
                const doc = p.toObject();
                doc.id = doc._id.toString();
                delete doc._id;
                return doc;
            });
            res.json(transformed);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });

    app.use(bot.webhookCallback(WEBHOOK_PATH));
    app.use(express.static(DIST_PATH));

    return app;
}
