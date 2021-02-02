const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const publicPath = path.join(__dirname, '../public');
const http2https = require('./middleware/http2https');
const config = require('./config/default');
const MongoD = require('./database/mongod');
const databaseConfig = require('./dev/databaseConfig');
const node_media_server = require('./media_server');

const homeRouter = require('./routers/home');
const dashboardRouter = require('./routers/dashboard');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const registerRouter = require('./routers/register');
const userRouter = require('./routers/user');
const businessRouter = require('./routers/business');
const wildcardRouter = require('./routers/wildcard');

/* Connect to MongoDB */
const mongod = new MongoD(config.mongodb);
mongod.create_connection();
mongoose.connect(
    `mongodb://localhost:${config.mongodb.port}/${config.mongodb.dbname}`,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

/* Configure express */
const app = express();
app.use(http2https);
app.use(express.static(publicPath));
app.use('/thumbnails', express.static('server/thumbnails'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secret));
app.use(session({
    secret: config.secret,
    resave: true,
    saveUnititialized: true
}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport')(passport);

app.use(homeRouter);
app.use(dashboardRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);
app.use(userRouter);
app.use(businessRouter);
app.use(wildcardRouter);