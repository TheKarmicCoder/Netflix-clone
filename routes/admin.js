const router = require("express").Router();
const verifyToken = require("../verifyToken"); 
const User = require("../models/User"); 

// PATCH /request-admin endpoint
router.patch('/request-admin', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Get the user ID from the decoded token
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { adminRequest: true }, // Update adminRequest to true
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Admin request sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


router.patch('/promote-to-admin/', verifyToken, async (req, res) => {
    try {
       const userId = req.user.userId; 
       const updatedUser = await User.findByIdAndUpdate(
        userId,
        { isAdmin: true, adminRequest: false },
        { new: true }
       );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json({ message: "User promoted to admin successful" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;
