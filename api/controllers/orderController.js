// const createError = require("../utils/createError");
const Order = require("../models/Order");
const Gig = require("../models/Gig");
// const Stripe = require("stripe");

// payment intent
// const intent = async (req, res, next) => {
//     const stripe = new Stripe(process.env.STRIPE);

//     const gig = await Gig.findById(req.params.id);

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: gig.price * 100,
//         currency: "usd",
//         automatic_payment_methods: {
//             enabled: true,
//         },
//     });

//     const newOrder = new Order({
//         gigId: gig._id,
//         img: gig.cover,
//         title: gig.title,
//         buyerId: req.userId,
//         sellerId: gig.userId,
//         price: gig.price,
//         payment_intent: paymentIntent.id,
//     });

//     await newOrder.save();

//     res.status(200).send({
//         clientSecret: paymentIntent.client_secret,
//     });
// };

// create order
const createOrder = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId);

        const newOrder = new Order ({
            gigId: gig._id,
            img: gig.img,
            title: gig.title,
            price: gig.price,
            buyerId: req.userId,
            sellerId: gig.userId,
            isCompleted: true,
            payment_intent: "temporary"
        });

        await newOrder.save();
        res.status(201).send("successful");
    } catch(err) {
        next(err)
    }
}

// get orders
const getOrders = async (req, res, next) => {
    try {
        console.log("order: ", req.session.user);
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true,
        });

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};

// update order
// const confirm = async (req, res, next) => {
//     try {
//         const orders = await Order.findOneAndUpdate(
//             {
//                 payment_intent: req.body.payment_intent,
//             },
//             {
//                 $set: {
//                     isCompleted: true,
//                 },
//             }
//         );

//         res.status(200).send("Order has been confirmed.");
//     } catch (err) {
//         next(err);
//     }
// };


module.exports = {
    createOrder,
    getOrders
}