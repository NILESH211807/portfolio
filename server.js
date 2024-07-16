require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const cookieParser = require('cookie-parser');

const connectdb = require('./config/database');
const authRouter = require('./router/auth-router');
const error_middlerware = require('./middleware/error');


// const corsOptions = {
//     origin: 'https://elegant-croquembouche-6ebe1e.netlify.app',
//     methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
//     credentials: true,
// }

const allowedOrigins = [
    'http://localhost:5173',
    'https://elegant-croquembouche-6ebe1e.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);

app.use(error_middlerware);

app.get('/', function (req, res) {
    res.status(200).send('Hello');
})

PORT = process.env.PORT || 3000;

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
})
