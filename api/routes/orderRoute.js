const router = require("express").Router();
const verifyToken  = require("../middleware/jwt");
const { 
    createOrder, getOrders
} = require("../controllers/orderController");


router.post("/:gigId", verifyToken, createOrder);
router.get("/", getOrders);     // verifyToken need
// router.post("/create-payment-intent/:id", verifyToken, intent);
// router.put("/", verifyToken, confirm);


module.exports = router;