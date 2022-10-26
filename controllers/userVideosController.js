import UserVideos from "../models/UserVideos.js";
import User from "../models/User.js";

export const createUserVideos = async (req, res) => {
  try {
    const newUserVideos = new UserVideos(req.body);
    await newUserVideos.save();

    res.status(200).json(newUserVideos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserVideos = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userVideos = await UserVideos.find({ userId: currentUser._id });

    res.status(200).json(userVideos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleVideo = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userVideos = await UserVideos.findOne({ userId: currentUser._id });

    const existedVideo = userVideos.videos.filter(
      (vid) => vid.id.videoId === req.body.videoId
    );

    // if no such video in DB - push
    if (!existedVideo.length > 0) {
      await userVideos.updateOne({
        $push: {
          videos: req.body.video,
        },
      });
      const newVideosAfterUpdate = await UserVideos.findOne({
        userId: currentUser._id,
      });
      res.status(200).json(newVideosAfterUpdate);
    } else {
      // if video is already there - pull
      await userVideos.updateOne({
        $pull: {
          videos: req.body.video,
        },
      });
      const newVideosAfterUpdate = await UserVideos.findOne({
        userId: currentUser._id,
      });
      res.status(200).json(newVideosAfterUpdate);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
