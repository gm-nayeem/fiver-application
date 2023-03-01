const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// create new message
const createMessage = async (req, res, next) => {
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        userId: req.userId,
        desc: req.body.desc,
    });

    try {
        const savedMessage = await newMessage.save();
        
        // after creating new msg update conversation
        await Conversation.findOneAndUpdate(
            { id: req.body.conversationId },
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc,
                },
            },
            { new: true }
        );

        res.status(201).send(savedMessage);
    } catch (err) {
        next(err);
    }
};

// get all messages
const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        res.status(200).send(messages);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createMessage,
    getMessages
}