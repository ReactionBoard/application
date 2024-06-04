import { ReactionBoard } from "../lib";
import { IEventOptions } from "../lib/Interface/Events";

export const ClientEvent: IEventOptions = {
  name: "ready",
  run: (client: ReactionBoard) => {
    console.log(`Ready! ${client.user?.username}`);

    client.DeployChatInputCommands();
  },
};
