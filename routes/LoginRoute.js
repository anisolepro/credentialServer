const express = require('express');
const cors = require('cors');
const router = express.Router()
const userSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.use(cors());
router.post("/", async (req, res) => {

    console.log(req.body);
    let result = await userSchema.findOne({ "username": req.body.username });
    if (result == null) { return res.json({ "error": "Invalid Username or Password" }) }

    let check = await bcrypt.compare(req.body.password, result.password);
    console.log(check)
    if (!check) {
        return res.json({ "error": "Invalid Username or Password" })
    }

    let token = jwt.sign({ "auth": result.id }, 'key');


    // console.log(result.id)
    // console.log(jwt.verify(token, "key").auth);
    res.send(token);

})

module.exports = router