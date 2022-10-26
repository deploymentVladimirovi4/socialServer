import mongoose from "mongoose";

const UserVideosSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videos: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserVideos", UserVideosSchema);
