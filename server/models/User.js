const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePic: {type: String, default: true},
    isAdmin: {type: Boolean, default: false},
    adminRequest: {type: Boolean, default: false},
},
{timestamps: true}
);

module.exports = mongoose.model("User" , UserSchema);