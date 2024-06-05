import process from "process";
import {
  Client,
  ClientOptions,
  Collection,
  RESTPostAPIApplicationCommandsJSONBody,
  Routes,
} from "discord.js";
import { config } from "dotenv";
import fs from "node:fs";
import { IEventOptions } from "../Interface/Events";
import { ICommandFileStructure } from "../Interface/Commands";
import { Validator } from "../../helpers/validator";
import mongoose from "mongoose";
import { Logger } from "../Logger/logger";

export class ReactionBoard extends Client {
  public constructor(Options: ClientOptions) {
    config();
    const validator = new Validator();

    // validate env variables.
    validator.ENV_Variables();

    super(Options);

    this.connectMongoClient();
    this.Events();
    this.Commands();
  }

  public message_commands = new Collection<string, ICommandFileStructure>();
  public commands = new Collection<string, ICommandFileStructure>();
  public chatInputCommandData = Array<RESTPostAPIApplicationCommandsJSONBody>();
  public logger = new Logger();

  private async connectMongoClient() {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
  }

  public DeployChatInputCommands() {
    this.rest.setToken(process.env.DISCORD_TOKEN);
    return this.rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: this.chatInputCommandData,
    });
  }

  private Commands() {
    const files = fs.readdirSync(`./commands/`);
    for (const file of files) {
      const ctx: ICommandFileStructure = require(
        `../../commands/${file.split(".").at(0)}`,
      );

      if (ctx.message) {
        this.message_commands.set(ctx.message.name, ctx);
      }

      if (ctx.chatInput) {
        this.commands.set(ctx.chatInput.data.name, ctx);
        this.chatInputCommandData.push(ctx.chatInput.data.toJSON());
      }
    }
  }

  private Events() {
    const files = fs.readdirSync(`./events/`);
    for (const file_name of files) {
      const file: IEventOptions = require(
        `../../events/${file_name.split(".").at(0)}`,
      ).ClientEvent;
      if (!file.name || !file.run) {
        this.logger.warn(`Missing #name or #run properties in ${file_name}`);
      } else {
        this.on(file.name, (...args: any) => file.run(...args));
      }
    }
  }
}
