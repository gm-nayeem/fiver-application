const router = require("express").Router();
const {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} = require("../controllers/conversationController");
const verifyToken  = require("../middleware/jwt");

// all route are protected with verify token
router.get("/", getConversations);
router.post("/", createConversation);
router.get("/single/:id", getSingleConversation);
router.put("/:id", updateConversation);

module.exports = router;