import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // find if conversation exists between these participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    // sending message for the first time
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // SOCKET IO FUNCTIONALITY WILL GO HERE

    // save the data
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller ", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMessages(req, res) {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;
    
    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, userToChatId]}
    }).populate("messages");

    if(!conversation) {
        return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);

  } catch (err) {
    console.log("Error in get messages controller ", err.message);
    res.status(500).json({ error: "Interal Server error" });
  }
}
export { sendMessage, getMessages };
