import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    coverPicture: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followins: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      max: 330,
    },
    hometown: {
      type: String,
    },
    relationship: {
      type: String,
    },
    birthday: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    myVideos: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
