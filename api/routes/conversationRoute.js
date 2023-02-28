const router = require("express").Router();
const {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} = require("../controllers/conversationController");
const verifyToken  = require("../middleware/jwt");

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

module.exports = router;