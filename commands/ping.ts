import {
  IChatInputCommandOptions,
  IMessageCommandOptions,
  IRunOptions,
} from "../lib/Interface/Commands";
import {
  Message,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

export const message: IMessageCommandOptions = {
  name: "ping",
};

export const chatInput: IChatInputCommandOptions = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Ping, Pong!"),
};

export const Run: IRunOptions = {
  messageRun(message, args) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: message.client.user.username,
        iconURL: message.client.user.displayAvatarURL(),
      })
      .setDescription(
        `**⚡️ | Ping, Pong!**\n\n**💫 | ${message.client.ws.ping}**ms`,
      )
      .setColor("#e989fa")
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  },

  chatInputRun(interaction) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .setDescription(
        `**⚡️ | Ping, Pong!**\n\n**💫 | ${interaction.client.ws.ping}**ms`,
      )
      .setColor("#e989fa")
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
