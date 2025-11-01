# TelegramBot
Creating Telegram bot to practice

# Enviroment

Node v22.21.0
npm v10.9.4

# Dependencies

> npm init -y

> npm install telegraf dotenv winston

> npm install axios cheerio # to ccr service

> npm install node-cron


# How to run

> node src/index.js

## Tests

Node.js Native Test Runner

> node --test


# Folder Structure

telegrambot/

│

├── package.json

├── .env

├── .gitignore

│

├── src/

│   ├── index.js               # Entry point

│   ├── bot.js                 # Telegraf bot initialization

│   │

│   ├── commands/              # Organized command files

│   │   ├── start.js

│   │   ├── help.js

│   │   ├── ponte_on.js

│   │   ├── ponte_off.js

│   │   └── ponte.js

│   │

│   ├── middlewares/           # middlewares

│   │   └── logger.js

│   │

│   ├── services/              # For APIs, DB, etc.

│   │   ├── ccrService.js      # to get information from ccr via sul

│   │   └── subscriptionService.js

│   │

│   ├── scheduler/          # for cron schedulers

│   ├── utils/                 # Reusable utilities

│   │   └── logger.js

│   │

│   └── config/                # Config loader

│       └── index.js

│   │

│   └── data/                # Create data folder

│

└── README.md


