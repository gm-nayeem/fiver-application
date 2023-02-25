const router = require("express").Router();
const verifyToken  = require("../middleware/jwt");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");


router.post("/", verifyToken, createReview ) // verify token need
router.get("/:gigId", getReviews )
router.delete("/:id", deleteReview)     // not done yet

module.exports = router;