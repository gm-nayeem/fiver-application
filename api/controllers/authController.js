const User = require("../models/User");
const createError = require("../utils/createError.js");
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

        // jwt
        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY
        );

        const { password, ...info } = user._doc;

        // set cookie
        res.cookie("accessToken", token);

        res.status(200).send(info);
    } catch (err) {
        next(err);
    }
};

// logout
const logout = async (req, res) => {
    const token = req.cookies.accessToken;
    console.log("token", token);
    // remove cookie
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");
};


module.exports = {
    register,
    login,
    logout
}