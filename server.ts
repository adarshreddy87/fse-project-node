/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>follows</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import BookmarkController from "./controllers/BookmarkController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";
import DislikeController from "./controllers/DislikeController";
import AuthenticationController from "./controllers/AuthenticationController";
import mongoose from 'mongoose';
import 'dotenv/config'
import ListController from "./controllers/ListController";

const session = require("express-session");
const app = express();
let sess = {
    // put this into an env file
    secret: "secretKey",
    proxy: true,
    saveUninitialized : true,
    resave : true,
    cookie : {
        sameSite: 'none',
        secure: true
    }
}

if (process.env.ENVIRONMENT === 'PRODUCTION') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true;
}


var cors = require('cors');
app.use(session(sess));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://tuiter-react.netlify.app']
}));

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "tuiter-admin";
const DB_PASSWORD = "tuiterpassword";
const HOST = "tuiterdatabase.oa2ca.mongodb.net";
const DB_NAME= "myFirstDatabase";
const DB_QUERY= "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
mongoose.connect(connectionString);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const followController = FollowController.getInstance(app);
const messageController = MessageController.getInstance(app);
const dislikeController = DislikeController.getInstance(app);
const listController = ListController.getInstance(app);
AuthenticationController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);