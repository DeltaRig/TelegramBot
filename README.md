# TelegramBot
Creating Telegram bot to practice

# Enviroment

Node v12.22.9

# Dependencies

npm init -y

npm install telegraf dotenv winston

npm install axios cheerio # to ccr service


# How to run

node src/index.js

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

│   │   └── ccr.js

│   │

│   ├── middlewares/           # middlewares

│   │   └── logger.js

│   │

│   ├── services/              # For APIs, DB, etc.

│   │

│   ├── utils/                 # Reusable utilities

│   │   └── logger.js

│   │

│   └── config/                # Config loader

│       └── index.js

│

└── README.md
