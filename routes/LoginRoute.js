const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
router.post("/", async (req, res) => {

    console.log(req.body);
    let result = await userSchema.findOne({ "username": req.body.username, "password": req.body.password });
    if (result == null) { return res.json({ "error": "Invalid Username or Password" }) }



    res.send(result);

})

module.exports = router