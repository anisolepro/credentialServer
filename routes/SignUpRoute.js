const express = require('express');
const router = express.Router()
const userSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

router.use(cors());


let tempFileName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profilePics')
    },
    filename: function (req, file, cb) {
        tempFileName = `${Date.now()}-${file.originalname}`;
        cb(null, tempFileName)
    }
})

const upload = multer({ storage: storage }).single("profilePic")

router.post("/", async (req, res) => {


    await upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
    });




    let user = await userSchema.find({ "username": req.body.username });
    if (user.length > 0) { return res.json({ "error": "username already exists" }) }
    user = await userSchema.find({ "email": req.body.email });
    if (user.length > 0) { return res.json({ "error": "Email already exists" }) }

    try {




        let hash = await bcrypt.hash(req.body.password, 10);
        // return res.send("uploaded")


        user = await userSchema({
            "username": req.body.username,
            "email": req.body.email,
            "password": hash,
            "profilePicType": `${tempFileName.split(".").at(-1)}`
        });
        await user.save();




        fs.rename(`profilePics/${tempFileName}`, `profilePics/${user.id}.${user.profilePicType}`, () => { })
        let token = jwt.sign({ "auth": user.id }, 'secretKey69');

        // console.log(req.body)

        let message = " Successfully Signed Up"
        res.send({ token, message });
    }
    catch (err) {
        res.send({ "error": err.message });
    }
})

module.exports = router;