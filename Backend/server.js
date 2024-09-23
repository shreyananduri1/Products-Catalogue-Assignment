const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDb = require('./config/dbConnection');

const port = process.env.PORT || 5000;

const app = express();

connectDb();
app.use(express.json(), cors())

app.use("/api/auth", require("./routes/loginRoutes"));

app.listen(port, () => {
    console.log("Server running on", port)
})
