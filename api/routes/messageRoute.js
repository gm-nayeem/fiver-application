const router = require("express").Router();
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");
const verifyToken = require("../middleware/jwt");


router.post("/", verifyToken, createMessage);
router.get("/:conversationId", verifyToken, getMessages);


module.exports = router;