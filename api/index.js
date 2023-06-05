const express =  require("express");

const app = express();

const mongoose = require("mongoose");

const connectToMongo = async () => {
    mongoose.connect( 
        process.env.MONGO_URI ,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log("Connected to mongo Successful");
        }
)};

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

app.listen(8800, () => {
    console.log("Server");
})