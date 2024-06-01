import { ReactionBoard } from "../lib";
import { ICommandFileStructure } from "../lib/Interface/Commands";
import { IEventOptions } from "../lib/Interface/Events";
import { ChatInputCommandInteraction } from 'discord.js';

export const ClientEvent: IEventOptions = {
    name: 'interactionCreate',
    run (interaction: ChatInputCommandInteraction) {
        const client = interaction.client as ReactionBoard;

        if (interaction.isChatInputCommand()) {
            const command: ICommandFileStructure | undefined = client.commands.get(interaction.commandName);
            if (!command) return;

            if (command.Run.chatInputRun) {
                command.Run.chatInputRun(interaction);
            }
        }
    },
}