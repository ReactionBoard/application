import {
  PermissionsString,
  Message,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
export interface IRunOptions {
  messageRun?: (message: Message, args: string[], options: any) => any;
  chatInputRun?: (interaction: ChatInputCommandInteraction) => any;
  subCommands?: [{ name: string; value: string }];
  commands?: any;
}

export interface IMessageCommandOptions {
  name: string;

  permissions?: {
    user?: PermissionsString[];
    client?: PermissionsString[];
  };
}

export interface IChatInputCommandOptions {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
}

export interface ICommandFileStructure {
  message?: IMessageCommandOptions;
  chatInput?: IChatInputCommandOptions;
  Run: IRunOptions;
}
