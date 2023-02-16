const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');


router.post("/", async (req, res) => {

    console.log(req.body);
    let result = await userSchema.findOne({ "username": req.body.username, "password": req.body.password });
    if (result == null) { return res.json({ "error": "Invalid Username or Password" }) }



    res.send(result);

})

module.exports = router