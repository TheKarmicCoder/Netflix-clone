

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// Register
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const newUser = new User({
           
            email: req.body.email,
            password: hashedPassword,
            adminRequest: true
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json(err);
    }
});



// Login
router.post("/login", async (req, res) => {
    const { email, password: userPassword } = req.body; 

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_CODE,
            { expiresIn: "5h" }
        );

        const { password, ...userInfo } = user._doc; // separates the password and returns user info
        res.status(200).json({ ...userInfo, token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json(err);
    }
});

module.exports = router;