const express =  require("express");

const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true, })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

const server = app.listen(8800, () => {
    const port = server.address().port;
    console.log('The server address port is %s', port);
})
