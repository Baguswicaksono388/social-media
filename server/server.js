const express = require('express');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB')
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("welcome to homepage");
})

app.use("/api/users", require('./routes/users'));
app.use("/api/auth", require('./routes/auth'));


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port `, PORT);
});