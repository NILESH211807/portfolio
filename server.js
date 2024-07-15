require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const cookieParser = require('cookie-parser');

const connectdb = require('./config/database');
const authRouter = require('./router/auth-router');
const error_middlerware = require('./middleware/error');


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRouter);

app.use(error_middlerware);

app.get('/', function (req, res) {
    // res.cookie('token', token, {
    //     expires: new Date((Date.now() + 25892000000)),
    //     httpOnly: true
    // });

    res.cookie("names", "NILESJH", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
    res.status(200).send('Cookie set successfully');

    // console.log(res.status(200).json(req.cookies));
})

PORT = process.env.PORT || 3000;

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}/`);
    });
})
