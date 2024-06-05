import { GatewayIntentBits } from "discord.js";
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
    `./logs/uexps/${Date.now()}`,
    `Info\nDate: ${new Date()}\nError\n\n` + error,
  );
});

process.on("unhandledRejection", (reason, promise) => {
  client.logger.error(`unhandledRejection: ${reason}`, promise);

  fs.writeFileSync(
    `./logs/uhrs/${Date.now()}`,
    `Info\nDate: ${new Date()}\nError\n\n${reason}`,
  );
});

client.login(process.env.DISCORD_TOKEN);
