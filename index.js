const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors");
const LoginRoute = require('./routes/LoginRoute')
const SignUpRoute = require('./routes/SignUpRoute')
const AuthToken = require('./routes/AuthToken')

const app = express()
const port = 6969;

app.use(cors());


app.use(express.json())

const uri = "mongodb+srv://test:qrqjyoqhAFsyqVTN@users.kckztnk.mongodb.net/maindb?retryWrites=true&w=majority"


mongoose.set('strictQuery', false);
mongoose.connect(uri, () => { console.log("connected") });



// express endpoints



app.get("/", (req, res) => {
    res.send("anisole");
})

app.use('/login', LoginRoute)


app.use('/signup', SignUpRoute)
app.use('/auth', AuthToken)


// listening port

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})