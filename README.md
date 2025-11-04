# Axiom Trade Backend

Backend API server for [Axiom.Trade](https://axiom.trade), a comprehensive cryptocurrency trading support platform featuring perpetual trading capabilities. This backend provides RESTful APIs, real-time WebSocket communication, and solana blockchain integration for perpetual futures trading, spot trading, user management, and social features. It's not full code and ongoing, feel free to reach out of me when you have question [Telegram: https://t.me/DevCutup, Whatsapp: https://wa.me/13137423660]. 

## 🚀 Features

### Core Functionality
- **Perpetual Trading Support**: Backend infrastructure for perpetual futures trading with leverage, margin management, and position tracking
- **Spot Trading**: Support for spot market trading across multiple chains
- **Token Management**: Complete token lifecycle management including listing, metadata retrieval, and image fetching
- **User Authentication & Management**: Secure user registration, authentication with JWT, and wallet management
- **Multi-Chain Support**: Integration with Solana, Ethereum, Tron, Polygon, and Binance Smart Chain
- **Real-Time Communication**: WebSocket-based real-time updates for trading activities, market data, and position updates
- **Order Management**: Order book management, execution engine, and trade history tracking
- **Social Features**: 
  - Chat system for token-specific discussions
  - Voting system for community governance
  - User leveling and referral system
- **Meme Coin Tracking**: Specialized tracking for meme coins with bonding curve analytics
- **Token Discovery**: Integration with BullX API for token discovery and filtering

### Technical Features
- **RESTful API**: Express.js-based API endpoints
- **Real-Time Updates**: Socket.IO for live data streaming
- **Database**: MongoDB with Mongoose ODM
- **TypeScript**: Fully typed codebase for better maintainability
- **Blockchain SDKs**: 
  - Solana Web3.js & Metaplex
  - Raydium SDK v2


## 📋 Prerequisites

- **Node.js** >= 18.x
- **MongoDB** >= 5.0 (or MongoDB Atlas)
- **Yarn** >= 4.9.1 (package manager)
- **TypeScript** >= 5.2.2


## 📁 Project Structure

```
Axiom-Trade-Backend/
├── api/                 # API helper functions
│   └── index.ts        # Token list fetching logic
├── config/             # Configuration files
│   ├── config.ts       # Environment variables and Solana connection
│   └── index.ts        # MongoDB connection setup
├── model/              # Mongoose database models
│   ├── ChatModel/      # Chat messages schema
│   ├── CoinModel/      # Token/coin schema
│   ├── KeyModel/       # API keys management
│   ├── LevelModel/     # User leveling system
│   ├── MemeModel/      # Meme coin tracking
│   ├── SocketModel/    # Socket connection tracking
│   ├── UserModel/      # User authentication schema
│   └── VoteModel/      # Voting system schema
├── routes/             # Express route handlers
│   └── CoinRoute/      # Token-related endpoints
├── socket/             # WebSocket implementation
│   ├── socketClient.ts # Socket client utilities
│   └── socketServer.ts # Socket.IO server setup
├── utils/              # Utility functions
│   └── index.ts        # Token image fetching helpers
├── index.ts            # Main application entry point
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```


## Contact Information

- **X (Twitter)**: [@devcutup](https://twitter.com/devcutup)
- **Telegram**: [@DevCutup](https://t.me/DevCutup)
- **WhatsApp**: [Contact via WhatsApp](https://wa.me/13137423660)
