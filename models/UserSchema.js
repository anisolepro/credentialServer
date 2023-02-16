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
    varification: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;