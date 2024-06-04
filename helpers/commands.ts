import { EmbedBuilder } from "discord.js";

export function createSimpleEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTimestamp()
    .setFooter({ text: `ReactionBoard - 2024` });
}

// this is NOT how you use typescript.
export class ParseOptions {
  pop: any;

  public constructor(options: any) {
    this.pop = options;
  }

  getType() {
    return this.pop.find((v: any) => v.name === "-type");
  }

  getChannel() {
    return this.pop.find((v: any) => v.name === "-channel");
  }

  getAnyOther(identifier: string) {
    return this.pop.find((v: any) => v.name === identifier);
  }
}
