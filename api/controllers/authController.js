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

        // jwt token
        const token = jwt.sign(
            {
                id: user._id,
                isSeller: user.isSeller,
            },
            process.env.JWT_KEY,
            { expiresIn: "2h" }
        );

        const { password, ...info } = user._doc;

        // set session
        req.session.token = token;
        req.session.user = "user";
        req.session.save(err => {
            if (err) {
                console.log("session error: ", err);
                return next(err);
            }
        });

        console.log("login token: ", req.session.token);
        console.log("login user: ", req.session.user);

        res.status(200).send(info);
    } catch (err) {
        next(err);
    }
};

// logout
const logout = (req, res) => {
    const user = req.session.user;

    req.session.destroy(err => {
        if (err) {
            return next(err)
        } else {
            console.log("session destroy: ", user);
        }
    });
    res.status(200).send("User has been logged out.");
};


module.exports = {
    register,
    login,
    logout
}