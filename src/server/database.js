import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL, { dbName: 'marketBot' });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

const productSchema = new mongoose.Schema({}, { strict: false });
export const Product = mongoose.model('Product', productSchema, 'products');
