import { PermissionsString, Message, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

export interface IRunOptions {
    messageRun?: (message: Message, args: string[]) => any;
    chatInputRun?: (interaction: ChatInputCommandInteraction) => any;
}

export interface IMessageCommandOptions {
    name: string;

    permissions?: {
        user?: PermissionsString[];
        client?: PermissionsString[];
    };
}

export interface IChatInputCommandOptions {
    data: SlashCommandBuilder;
}

export interface ICommandFileStructure {
    message?: IMessageCommandOptions;
    chatInput?: IChatInputCommandOptions;
    Run: IRunOptions;
}