import mongoose from "mongoose";

const guildSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },

  // Reaction settings.
  reaction: {
    type: String,
    default: ":star:", // default to the star emoji.
  },

  // the number of reactions required.
  amount: {
    type: Number,
    default: 5,
  },

  // the channel we send reaction board messages to. (the board channel, like: starboard)
  channel: {
    type: String,
    default: null,
  },

  // the channel to log messages related to ReactionBoard.
  log: {
    type: String,
    default: null,
  },
});

export const guilds = mongoose.model("guilds", guildSchema);
