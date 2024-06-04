import { ReactionBoard } from "../lib";
import { ICommandFileStructure } from "../lib/Interface/Commands";
import { IEventOptions } from "../lib/Interface/Events";
import { Message } from "discord.js";

export const ClientEvent: IEventOptions = {
  name: "messageCreate",
  async run(message: Message) {
    const client = message.client as ReactionBoard;
    const prefix = "r?";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const input = args.shift()?.toLocaleLowerCase();
    if (!input?.length) return;

    const command: ICommandFileStructure | undefined =
      client.message_commands.get(input);
    if (!command) return;

    if (command.Run.messageRun) {
      const options = args.map((v, index) => {
        return { name: v, value: args.at(index + 1) };
      });

      command.Run.messageRun(message, args, options);
    }
  },
};
