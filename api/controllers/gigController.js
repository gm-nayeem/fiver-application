const Gig = require("../models/Gig");
const createError = require("../utils/createError");

// create gig
const createGig = async (req, res, next) => {
    // console.log(req.body);
    if (!req.isSeller)
        return next(createError(403, "Only sellers can create a gig!"));

    const newGig = new Gig({
        ...req.body,
        userId: req.userId,
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (err) {
        next(err);
    }
};

// delete gig
const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId);
        if (gig.userId !== req.userId)
            return next(createError(403, "You can delete only your gig!"));

        await Gig.findByIdAndDelete(req.params.gigId);
        res.status(200).send("Gig has been deleted!");
    } catch (err) {
        next(err);
    }
};

// get single gig
const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.gigId);
        if (!gig) next(createError(404, "Gig not found!"));
        res.status(200).send(gig);
    } catch (err) {
        next(err);
    }
};

// get all gigs
const getGigs = async (req, res, next) => {
    const q = req.query;

    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max }),
            },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createGig,
    getGig,
    getGigs,
    deleteGig
}