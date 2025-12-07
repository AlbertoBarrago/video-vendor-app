# 🛍️ Market Bot Application

A modern Telegram bot with an integrated mini-app for selling digital products and services. This project serves as a blueprint for resellers and digital product vendors who want to sell courses, services, or digital content directly through Telegram.

## ✨ Features

- **Telegram Bot Integration** - Native Telegram bot with inline keyboard navigation
- **Mini Web App** - Beautiful web interface that works both inside Telegram and in regular browsers
- **Product Catalog** - Grid-based responsive product display with images
- **Product Details** - Detailed product pages with descriptions and pricing
- **Mock Purchases** - Simulated purchase flow for demonstration
- **Responsive Design** - Optimized for mobile and desktop viewing
- **Telegram Theme Support** - Automatically adapts to user's Telegram theme
- **Cross-Platform** - Works in Telegram mini-app and standalone web browsers

## 📦 Current Products

The demo includes sample products for educational services:
- **Docker** - Containerization and orchestration course
- **React** - Modern React development training
- **Git** - Version control mastery
- **Angular** - Enterprise Angular framework course
- **Problem Solving** - Algorithms and data structures

## 🛠️ Tech Stack

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- Telegraf (Telegram Bot Framework)
- dotenv for environment configuration

**Frontend:**
- Vanilla JavaScript (ES6+)
- Vite for building and development
- CSS3 with CSS variables for theming
- Telegram WebApp API

**DevOps:**
- Docker support
- Fly.io deployment ready
- ngrok for local development

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or cloud)
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd market-bot-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   BOT_TOKEN=your_telegram_bot_token_here
   MONGO_URL=your_mongodb_connection_string
   MINI_APP_URL=https://your-deployed-url.com
   ```

4. **Start development**
   ```bash
   npm run dev
   ```
   This will start:
   - Frontend dev server (Vite)
   - Backend server (Express + Bot)
   - ngrok tunnel for webhook testing

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start all services in development mode
- `npm run start:frontend` - Start only frontend dev server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build

## 📁 Project Structure

```
market-bot-app/
├── src/
│   ├── frontend/           # Frontend application
│   │   ├── components/     # UI components (Catalog, ProductDetails, Purchases)
│   │   ├── utils/          # Utilities (telegram integration, navigation)
│   │   └── main.js         # App entry point
│   ├── server/             # Backend server
│   │   ├── index.js        # Server setup
│   │   ├── botCommands.js  # Telegram bot handlers
│   │   ├── database.js     # MongoDB connection and models
│   │   └── endpoints.js    # Express API routes
│   └── style.css           # Global styles
├── dist/                   # Production build output
├── Dockerfile              # Docker configuration
├── fly.toml               # Fly.io deployment config
└── package.json           # Dependencies and scripts
```

## 🎨 Key Features Explained

### Telegram Bot Commands

- `/start` - Welcome message with catalog button and product viewer
- **View Products** button - Shows all products with images directly in chat

### Web App Navigation

The app provides seamless navigation through three main views:

1. **Catalog View** - Browse all available products
2. **Product Details** - View detailed information and purchase
3. **Purchases View** - See your purchase history

Navigation works through:
- Telegram's native back button (in mini-app)
- Custom back button (in web browsers)
- Action buttons at the bottom

### Database Schema

Products are stored with the following structure:
```javascript
{
  id: Number,
  title: String,
  description: String,
  price: Number,
  thumbnail: String,      // Image URL
  downloadUrl: String     // Download link for purchased items
}
```

## 🎯 Customization Guide

### Adding New Products

You can add products directly to MongoDB or create a script:

```javascript
await Product.create({
  id: 7,
  title: "Your Product",
  description: "Detailed description here...",
  price: 99.99,
  thumbnail: "https://your-image-url.com/image.png",
  downloadUrl: "#"
});
```

### Styling

All styles are in `src/style.css`. The app uses CSS variables that adapt to Telegram's theme:

```css
--bg-color
--text-color
--button-color
--button-text-color
--secondary-bg-color
```

### Bot Messages

Edit welcome messages and bot responses in `src/server/botCommands.js`.

## 🚀 Deployment

### Deploy to Fly.io

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Deploy: `fly deploy`

### Using Docker

```bash
docker build -t market-bot .
docker run -p 3000:3000 --env-file .env market-bot
```

## 🔧 Configuration

### MongoDB Setup

The app requires a MongoDB database. You can use:
- MongoDB Atlas (cloud)
- Local MongoDB instance
- Docker container

### Telegram Bot Setup

1. Talk to [@BotFather](https://t.me/botfather)
2. Create a new bot with `/newbot`
3. Copy the token to your `.env` file
4. Set webhook URL (done automatically by the app)

### Mini App URL

Set this to your deployed application URL in `.env`. For local development, use ngrok URL.

## 📝 Notes

- This is a **proof of concept** and demo application
- Purchase functionality is mocked (no real payments)
- Designed as a starting point for custom implementations
- Perfect for selling courses, digital products, or services

## 🤝 Contributing

Feel free to fork this project and customize it for your needs. Pull requests are welcome!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🐛 Known Issues

- Purchase state is not persisted (stored in memory only)
- No real payment integration (mock only)
- Download functionality is placeholder

## 🔮 Future Enhancements

- Real payment integration (Stripe, PayPal, Telegram Payments)
- User authentication and persistent purchase history
- Admin panel for product management
- Email notifications
- File delivery system
- Analytics and reporting

---

Built with ❤️ for the Telegram ecosystem
