require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Basic route to keep the service alive
app.get('/', (req, res) => {
    res.send('Discord Welcome Bot is running!');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Express server running on port ${PORT}`);
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`[${new Date().toISOString()}] Bot is ready! Logged in as ${client.user.tag}`);
    // Keep the process alive and log status
    setInterval(() => {
        console.log(`[${new Date().toISOString()}] Bot is alive! Ping: ${client.ws.ping}ms`);
    }, 30000); // Log every 30 seconds
});

// Listen for new members joining
client.on('guildMemberAdd', async (member) => {
    try {
        console.log(`[${new Date().toISOString()}] New member joined: ${member.user.tag}`);
        const welcomeChannel = await client.channels.fetch(process.env.WELCOME_CHANNEL_ID);
        
        if (!welcomeChannel) {
            console.error(`[${new Date().toISOString()}] Welcome channel not found!`);
            return;
        }

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('Welcome to the Server!')
            .setDescription(`Welcome ${member.user} to our server! We're glad to have you here.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Member Count', value: `${member.guild.memberCount}`, inline: true },
                { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: `ID: ${member.user.id}` });

        await welcomeChannel.send({ embeds: [welcomeEmbed] });
        console.log(`[${new Date().toISOString()}] Welcome message sent for ${member.user.tag}`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error sending welcome message:`, error);
    }
});

// Handle errors
client.on('error', error => {
    console.error(`[${new Date().toISOString()}] Discord client error:`, error);
});

process.on('unhandledRejection', error => {
    console.error(`[${new Date().toISOString()}] Unhandled promise rejection:`, error);
});

// Handle process termination
const shutdown = async () => {
    console.log(`[${new Date().toISOString()}] Shutting down gracefully...`);
    try {
        await client.destroy();
        console.log(`[${new Date().toISOString()}] Discord client destroyed`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error during shutdown:`, error);
    }
    process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Login to Discord with your client's token
console.log(`[${new Date().toISOString()}] Starting bot...`);
client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error(`[${new Date().toISOString()}] Login error:`, error);
    process.exit(1);
}); 