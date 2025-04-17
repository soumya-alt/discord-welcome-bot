require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // Keep the process alive
    setInterval(() => {
        console.log('Bot is alive!');
    }, 60000); // Log every minute
});

// Listen for new members joining
client.on('guildMemberAdd', async (member) => {
    try {
        const welcomeChannel = await client.channels.fetch(process.env.WELCOME_CHANNEL_ID);
        
        if (!welcomeChannel) {
            console.error('Welcome channel not found!');
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
    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
});

// Handle errors
client.on('error', error => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

// Keep the process alive
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN); 