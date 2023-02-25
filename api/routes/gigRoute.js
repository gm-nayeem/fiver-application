const router = require("express").Router();
const {
  createGig,
  deleteGig,
  getGig,
  getGigs
} = require("../controllers/gigController");
const verifyToken  = require("../middleware/jwt");


router.post("/", verifyToken, createGig);
router.delete("/:gigId", verifyToken, deleteGig);
router.get("/single/:gigId", getGig);
router.get("/", getGigs);

module.exports = router;