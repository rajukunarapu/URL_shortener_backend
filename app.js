const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AuthRoutes = require('./Routes/AuthRoutes');
const UrlRoutes = require('./Routes/URLRoutes');

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5000'];

app.use(cors({
    origin:function (origin, callback) {
        if(!origin){
            // Allow requests with no origin (like mobile apps or curl requests)
            return callback(null, true);
        }
        if(allowedOrigins.includes(origin)) {
            // Allow requests from the allowed origins
            console.log({origin})
            return callback(null, true);
        } else {
            // Reject requests from disallowed origins
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true
}));


app.use('/auth',AuthRoutes)
app.use('/url', UrlRoutes);


module.exports = app;