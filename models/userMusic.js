import mongoose from "mongoose";

const UserMusicSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    music: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserMusic", UserMusicSchema);
