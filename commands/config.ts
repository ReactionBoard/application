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
import { guilds } from "../schema/guild";
import { ReactionBoard } from "../lib";
import { Validator } from "../helpers/validator";

export const Run: IRunOptions = {
  subCommands: [
    { name: "set-channel", value: "setChannel" },
    { name: "set-emoji", value: "setEmoji" },
  ],

  commands: {
    // type - 1
    async setChannel(interaction: ChatInputCommandInteraction) {
      const client = interaction.client as ReactionBoard;
      const embed = createSimpleEmbed()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setColor("Blurple");

      try {
        await interaction.deferReply();

        // get the options
        const channel = interaction.options.getChannel("channel", true);

        await guilds.findOneAndUpdate(
          { id: interaction.guildId },
          { channel: channel.id },
          { upsert: true },
        );

        return interaction.editReply({
          embeds: [
            embed.setDescription(
              `Done, i've set the reaction board channel as: ${channel}`,
            ),
          ],
        });
      } catch (error) {
        client.logger.error(`error running command: ${error}`, error);

        return interaction.editReply({
          embeds: [
            embed.setDescription(`We got an error while running this command.`),
          ],
        });
      }
    },

    // type - 2
    async setEmoji(interaction: ChatInputCommandInteraction) {
      const client = interaction.client as ReactionBoard;
      const embed = createSimpleEmbed()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setColor("Blurple");

      try {
        await interaction.deferReply();
        const validator = new Validator();

        const emoji = interaction.options.getString("emoji", true);

        if (!validator.isEmoji(emoji)) {
          return interaction.editReply({
            embeds: [embed.setDescription(`Invalid unicode emoji.`)],
          });
        }

        await guilds.findOneAndUpdate(
          { id: interaction.guildId },
          { reaction: emoji },
          { upsert: true },
        );

        return interaction.editReply({
          embeds: [
            embed.setDescription(`Done, set the reaction emoji as: ${emoji}`),
          ],
        });
      } catch (error) {
        client.logger.error(`error running command: ${error}`, error);

        return interaction.editReply({
          embeds: [
            embed.setDescription(`We got an error while running this command.`),
          ],
        });
      }
    },
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
      // set-channel
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
    })
    .addSubcommand((command) => {
      return command
        .setName("set-emoji")
        .setDescription("Select a emoji.")
        .addStringOption((option) => {
          return option
            .setName("emoji")
            .setDescription("NOTE: custom emojis does not work.")
            .setRequired(true);
        });
    }),
};
