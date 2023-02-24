const router = require("express").Router();
import { deleteUser, getUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/jwt.js";

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;