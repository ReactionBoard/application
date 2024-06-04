import { GatewayIntentBits, codeBlock } from "discord.js";
import { ReactionBoard } from "./lib";
import process from "node:process";
import fs from "node:fs";

const client = new ReactionBoard({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

process.on("uncaughtException", (error) => {
  client.logger.error(`uncaughtexception: ${error}`, error);

  // save the full error to logs file.
  fs.writeFileSync(
    `./logs/uexps/${Date.now()}.md`,
    `# Info\n\n- **Date:** ${new Date()}\n\n# Error\n\n` + `\`` + error + `\``,
  );
});

client.login(process.env.DISCORD_TOKEN);
