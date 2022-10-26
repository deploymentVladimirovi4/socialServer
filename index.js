import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import * as AuthControllers from "./controllers/authController.js";
import * as UserControllers from "./controllers/userController.js";
import * as PostControllers from "./controllers/postController.js";
import * as ConversationControllers from "./controllers/conversationController.js";
import * as MessageControllers from "./controllers/messageController.js";
import * as userVideosController from "./controllers/userVideosController.js";
import * as userMusicController from "./controllers/musicController.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:12345@cluster0.hdss6hs.mongodb.net/socialapp?retryWrites=true&w=majority"
    );
    console.log("DB is Alive");
  } catch (error) {
    console.log("NO connection to DB");
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

//ROUTS

//USERS
// app.get("/user/:id", UserControllers.getUser);
app.post("/register", AuthControllers.register);
app.post("/login", AuthControllers.login);
app.put("/users/:userId", UserControllers.update);
app.get("/users", UserControllers.getAllUsers);

//FOLLOW USERS
app.put("/user/:id/follow", UserControllers.followUser);
app.put("/user/:id/unfollow", UserControllers.unfollowUser);

//POSTS
app.get("/post/:id", PostControllers.getPost);
app.get("/post", PostControllers.getAllPosts);
app.post("/post", PostControllers.createPost);
app.put("/post/:id", PostControllers.updatePost);
app.delete("/post", PostControllers.deletePost);
app.put("/like", PostControllers.likePost);
app.get("/newsfeed/:userId", PostControllers.getNewsFeed);

//CONVERSATIONS
app.post("/conversation", ConversationControllers.createConversation);
app.get("/conversation/:userId", ConversationControllers.getConversation);

//MESSAGES
app.post("/messages", MessageControllers.createMessage);
app.get("/messages/:conversationId", MessageControllers.getMessages);

//VIDEOS
app.post("/videos/create", userVideosController.createUserVideos);
app.put("/videos", userVideosController.handleVideo);
app.get("/videos/:userId", userVideosController.getUserVideos);

//MUSIC
app.post("/music/create", userMusicController.createUserMusic);
app.put("/music", userMusicController.handleSong);
app.get("/music/:userId", userMusicController.getUserMusic);

app.listen(process.env.PORT || 9999, () => {
  connect();
  console.log("app is alive on port 9999");
});
