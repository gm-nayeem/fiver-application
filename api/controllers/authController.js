import User from "../models/User";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register
export const register = async (req, res, next) => {
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
export const login = async (req, res, next) => {
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
        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .send(info);
    } catch (err) {
        next(err);
    }
};

// logout
export const logout = async (req, res) => {
    // remove cookie
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");
};