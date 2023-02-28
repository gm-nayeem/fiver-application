const User = require("../models/User");
const createError = require("../utils/createError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

// login
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect)
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY,
            {expiresIn: "24h"}
        );

        const { password, ...info } = user._doc;
        res.status(200).send({...info, accessToken: token});

    } catch (err) {
        next(err);
    }
};


module.exports = {
    register,
    login
}