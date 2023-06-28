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
const multer = require( 'multer' );

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

const storage = multer.diskStorage({
    destination: ( req, file, db ) =>{
        cb( null, 'public/posts' );
    },
    filename: ( req, file, cb )=>{
        cb( null, req.body.name );
    }
})

const upload = multer({ storage });

app.post( '/upload', upload.single('file'), ()=>{
    try {
        return res.status(200).json( 'File has been uploaded' );
    } catch (error) {
        
    }
} )

// Routes
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/posts', postsRoute);
app.use('/stories', storiesRoute);

const server = app.listen(5000, () => {
    const port = server.address().port;
    console.log('The server address port is %s', port);
})
