const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');


router.post("/", async (req, res) => {
    let user = await userSchema.find({ "username": req.body.username });
    if (user.length > 0) { return res.json({ "error": "username already exists" }) }
    user = await userSchema.find({ "email": req.body.email });
    if (user.length > 0) { return res.json({ "error": "Email already exists" }) }

    try {
        user = await userSchema(req.body);
        user.save();
        res.send(user);
    }
    catch (err) {
        res.send({ "error": err.message });
    }
})

module.exports = router