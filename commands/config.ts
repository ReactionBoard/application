import {
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import {
  IChatInputCommandOptions,
  IMessageCommandOptions,
  IRunOptions,
} from "../lib/Interface/Commands";
import { ParseOptions, createSimpleEmbed } from "../helpers/commands";

export const Run: IRunOptions = {
  subCommands: [{ name: "set-channel", value: "setChannel" }],

  commands: {
    // type - 1
    setChannel(interaction: ChatInputCommandInteraction) {},
  },

  async messageRun(message, args, options) {
    const op = new ParseOptions(options);
    const embed = createSimpleEmbed().setAuthor({
      name: message.author.username,
      iconURL: message.author.displayAvatarURL(),
    });

    const type = op.getType();

    // if the -type argument is missing.
    if (!type || !type.value) {
      embed
        .setTitle("Missing Argument:")
        .setDescription("Missing the -type argument.")
        .setColor("Orange");

      return message.channel.send({
        embeds: [embed],
      });
    }

    if (type.value === "1") {
      // -type 1 expects a -channel argument aswell.
      // this argument is NOT optional.
      const channel = op.getChannel();

      // if the -channel argument is missing.
      if (!channel || !channel.value) {
        embed
          .setTitle("Missing Argument:")
          .setDescription(`Missing the -channel argument.`)
          .setColor("Orange");

        return message.channel.send({
          embeds: [embed],
        });
      }
    }
  },
};

export const message: IMessageCommandOptions = {
  name: "config",
  permissions: {
    user: ["ManageGuild"],
  },
};

export const chatInput: IChatInputCommandOptions = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure this server.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((command) => {
      return command
        .setName("set-channel")
        .setDescription("Set the reaction-board channel. type - 1")
        .addChannelOption((option) => {
          return option
            .setName("channel")
            .setDescription("The channel to use.")
            .setRequired(true);
        });
    }),
};
