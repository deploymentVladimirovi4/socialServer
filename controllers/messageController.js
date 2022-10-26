import Message from "../models/Message.js";

//CREATE MESSAGE
export const createMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();
    console.log(savedMessage);
    res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET MESSAGES OF CONVERSATION
export const getMessages = async (req, res) => {
  try {
    const conversMessages = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(conversMessages);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// GET ALL MESSAGES
export const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();

    res.status(200).json(allMessages);
  } catch (error) {
    return res.status(500).json(error);
  }
};
