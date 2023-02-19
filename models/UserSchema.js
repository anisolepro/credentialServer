const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicType: {
        type: String,
        required: true
    },
    verification: {
        type: Boolean,
        default: false
    },
    login: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;