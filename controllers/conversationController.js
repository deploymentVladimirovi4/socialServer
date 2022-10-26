import Conversation from "../models/Conversation.js";

//CREATE CONVERSATION
export const createConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();

    res.status(200).json(savedConversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// GET CONVERSATION
export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};
