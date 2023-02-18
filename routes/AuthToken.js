const express = require('express');
const cors = require('cors');
const router = express.Router()
const userSchema = require('../models/UserSchema');

const jwt = require('jsonwebtoken');

router.use(cors());

router.post("/", async (req, res) => {
    let auth = await jwt.verify(req.body.token, "secretKey69").auth;
    // console.log(auth)
    let result = await userSchema.findOne({ "_id": auth }).select("-password");
    res.send(result)

})

module.exports = router