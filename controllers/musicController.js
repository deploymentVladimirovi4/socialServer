import UserMusic from "../models/userMusic.js";
import User from "../models/User.js";

export const createUserMusic = async (req, res) => {
  console.log("create fired");
  try {
    const newUserMusic = new UserMusic(req.body);
    await newUserMusic.save();

    res.status(200).json(newUserMusic);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserMusic = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userMusic = await UserMusic.find({ userId: currentUser._id });

    res.status(200).json(userMusic);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleSong = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userMusic = await UserMusic.findOne({ userId: currentUser._id });

    const existedSong = userMusic.music.filter(
      (song) => song.key === req.body.songKey
    );

    if (!existedSong.length > 0) {
      await userMusic.updateOne({
        $push: {
          music: req.body.song,
        },
      });
      const newMusicAfterUpdate = await UserMusic.findOne({
        userId: currentUser._id,
      });
      res.status(200).json(newMusicAfterUpdate);
    } else {
      await userMusic.updateOne({
        $pull: {
          music: req.body.song,
        },
      });
      const newMusicAfterUpdate = await UserMusic.findOne({
        userId: currentUser._id,
      });
      res.status(200).json(newMusicAfterUpdate);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
