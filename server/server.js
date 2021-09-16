const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL,
    // { useNewUrlParser: true, useUnifiedTopology: true  }
);
mongoose.connection.on('connected', () => {
    console.log("connected to mongoo")
});
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
});

/*CORS*/ 
let corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("welcome to homepage");
})

require("./models/User");

app.use("/api/users", require('./routes/users'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/posts", require('./routes/post'));


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port `, PORT);
});