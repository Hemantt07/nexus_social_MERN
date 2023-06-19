const express =  require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const storiesRoute = require("./routes/stories");
const cors = require("cors");
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true, })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
app.use('/stories', storiesRoute);

const server = app.listen(5000, () => {
    const port = server.address().port;
    console.log('The server address port is %s', port);
})
