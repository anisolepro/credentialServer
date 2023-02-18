const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post("/", async (req, res) => {
    let user = await userSchema.find({ "username": req.body.username });
    if (user.length > 0) { return res.json({ "error": "username already exists" }) }
    user = await userSchema.find({ "email": req.body.email });
    if (user.length > 0) { return res.json({ "error": "Email already exists" }) }

    try {
        let hash = await bcrypt.hash(req.body.password, 10);

        // console.log(hash);


        user = await userSchema({
            "username": req.body.username,
            "email": req.body.email,
            "password": hash
        });
        user.save();
        let token = jwt.sign({ "auth": user.id }, 'secretKey69');


        // console.log(result.id)
        // console.log(jwt.verify(token, "secretKey69").auth);
        let message = " Successfully Signed Up"
        res.send({ token, message });
    }
    catch (err) {
        res.send({ "error": err.message });
    }
})

module.exports = router