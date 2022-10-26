import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();

    // const currentUser = await User.findById(req.body.userId);
    // const usersPosts = await Post.find({ userId: currentUser._id });
    // const friendsPosts = await Promise.all(
    //   currentUser.followins.map((friendId) => {
    //     return Post.find({ userId: friendId });
    //   })
    // );

    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//UPDATE
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });

      res.status(200).json("post has been updated");
    } else {
      res.status(403).json("you can not edit this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//DELETE
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);

    if (post.userId === req.body.userId) {
      await post.deleteOne();
      const currentUser = await User.findById(req.body.userId);
      const usersPosts = await Post.find({ userId: currentUser._id });

      res.status(200).json(usersPosts);
    } else {
      res.status(403).json("you can not delete this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//LIKE & DISLIKE
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId,
        },
      });

      const posts = await Post.find();
      res.status(200).json(posts);
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId,
        },
      });

      const posts = await Post.find();
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//GETPOST
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GETALLPOSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//NEWSFEED
export const getNewsFeed = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const usersPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followins.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(usersPosts.concat(...friendsPosts));
  } catch (error) {
    console.log("oops");
    return res.status(500).json(error);
  }
};
