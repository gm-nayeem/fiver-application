const router = require("express").Router();
const { getUser, deleteUser } = require("../controllers/userController");
const verifyToken  = require("../middleware/jwt");

router.get("/:id", getUser); // need verify token
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;