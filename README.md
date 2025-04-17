# Discord Welcome Bot

A Discord bot that sends personalized welcome messages to new members joining your server.

## Features

- Sends welcome messages in a specified channel
- Displays member count and account creation date
- Error handling and logging
- 24/7 uptime when deployed on Render.com

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your values:
   - `DISCORD_TOKEN`: Your Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
   - `WELCOME_CHANNEL_ID`: The ID of the channel where welcome messages will be sent

## Deployment on Render.com

1. Create a new account on [Render.com](https://render.com) if you don't have one
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: Choose a name for your service
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node index.js`
5. Add the following environment variables in the Render dashboard:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `WELCOME_CHANNEL_ID`: Your welcome channel ID
6. Click "Create Web Service"

## Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the bot token and add it to your `.env` file
5. Enable the following intents in the bot settings:
   - Server Members Intent
   - Message Content Intent
6. Invite the bot to your server using the OAuth2 URL Generator
   - Select the following scopes: `bot`, `applications.commands`
   - Select the following permissions: `Send Messages`, `View Channels`

## License

MIT 