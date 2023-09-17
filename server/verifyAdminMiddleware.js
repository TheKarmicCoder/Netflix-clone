const jwt = require("jsonwebtoken");
const User = require("./models/User");
const { request } = require("express");

module.exports = async function (req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({message: "Access Denied"});

    try {
        const verified = jwt.verify(token,process.env.SECRET_CODE)

        const user = await User.findById(verified._id);
        if(!user) return res.status(403).json({message: "User not found"});
        if (!user.isAdmin) return res.status(403).json({message: "Not Authorized"});

        request.user = user;
        next();
    } catch (err) {
        res.status(400).json({message: "Invalid token"});
    }
};