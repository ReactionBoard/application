import { GatewayIntentBits } from 'discord.js';
import { ReactionBoard } from './lib';
import process from 'node:process';

const client = new ReactionBoard({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.login(process.env.DISCORD_TOKEN);