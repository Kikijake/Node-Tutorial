import mongoose, { Schema } from "mongoose";

const discordUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("DiscordUser", discordUserSchema);

