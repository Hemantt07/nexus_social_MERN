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
const path = require( 'path' );

app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true, })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));

const storage = multer.diskStorage({
    destination: ( req, file, cb ) =>{
        cb( null, 'public/images' );
    },
    filename: ( req, file, cb )=>{
        cb( null, req.body.name );
    },
});

app.use('/images', express.static( path.join( __dirname, 'public/images' ) ) );

const upload = multer({ storage: storage });

app.post( '/upload', upload.single('file'), ( req, res )=>{
    try {
        return res.status(200).json( 'File has been uploaded' );
    } catch (error) {
        console.log( error );
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
