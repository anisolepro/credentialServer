const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');


router.post("/", async (req, res) => {
    let result = await userSchema.findOne({ "username": req.body.username, "password": req.body.password });
    if (result) { return res.json({ "error": "Invalid Username or Password" }) }



    res.send(result);

})

module.exports = router