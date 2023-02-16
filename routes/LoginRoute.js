const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');


router.post("/", async (req, res) => {
    let result = await userSchema.findOne(req.body);
    if (result.length == 0) { return res.json({ "error": "User not Exists" }) }


    if (req.body.username == result.username && req.body.password == result.password) {
        res.send(result);
    } else {
        return res.json({ "error": "Invalid Username or Password" });
    }
})

module.exports = router