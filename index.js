const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const LoginRoute = require('./routes/LoginRoute')
const SignUpRoute = require('./routes/SignUpRoute')

const app = express()
const port = 6969;

app.use(express.json())

const uri = "mongodb+srv://test:qrqjyoqhAFsyqVTN@users.kckztnk.mongodb.net/maindb?retryWrites=true&w=majority"


mongoose.set('strictQuery', false);
mongoose.connect(uri, () => { console.log("connected") });



// express endpoints

app.use(cors({
    origin: '*'
}));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.get("/", (req, res) => {
    res.send("anisole");
})

app.use('/login', LoginRoute)


app.use('/signup', SignUpRoute)


// listening port

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})