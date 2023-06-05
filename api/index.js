const express =  require("express");

const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { MongoClient } = require("mongodb");

dotenv.config();


const client = new MongoClient(process.env.MONGO_URL);
async function connectDB() {
    await client.connect();
    console.log("Successfully connected to Atlas");
}
connectDB();

// Middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));




app.listen(8800, () => {
    console.log("Server");
})