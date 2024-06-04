import { ClientEvents } from "discord.js";

export interface IEventOptions {
  name: keyof ClientEvents;
  run: (...args: any) => any;
}
