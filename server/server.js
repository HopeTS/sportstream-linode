/*
 *  Main server / entry point
 */

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
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');

const publicPath = path.join(__dirname, '../public');
const clientRouter = require('./routers/client');
const authRouter = require('./routers/auth');
const http2https = require('./middleware/http2https');
const config = require('./config/default');
const MongoD = require('./database/mongod');

console.log(chalk.bold('Environment:'), chalk.blue(process.env.NAME));

/* Connect to MongoDB */
mongod = new MongoD(config.mongodb);
mongod.create_connection();
mongoose.connect(
    `mongodb://localhost:${config.mongodb.port}/castamatch`,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;
db.once('open', () => {
    console.log(chalk.green('Mongoose has connected to MongoDB'));
    console.log(chalk.bold('MongoDB port: '), chalk.blue(config.mongodb.port));
});    

/* Configure express */
const app = express();
app.use(http2https);
app.use(express.static(publicPath));
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

app.use(clientRouter);
app.use(authRouter);

/* Run server */
if (process.env.NAME === 'development') {
    http.createServer(app).listen(process.env.HTTP_PORT, () => {        
        console.log(chalk.underline.green('Development HTTP server has connected.'));
        console.log(
            chalk.bold('HTTP Port:'),
            chalk.blue(process.env.HTTP_PORT)
        );
    });
}

else if (process.env.NAME === 'https_production') {
    const httpsOptions = {
        key: fs.readFileSync(`${process.env.SSL_DIR}privkey.pem`, 'utf8'),
        cert: fs.readFileSync(`${process.env.SSL_DIR}cert.pem`, 'utf8'),
        ca: fs.readFileSync(`${process.env.SSL_DIR}chain.pem`, 'utf8')
    };

    https.createServer(httpsOptions, app).listen(process.env.HTTPS_PORT, () => {
        console.log(chalk.underline.green(`${process.env.NAME} HTTPS server has connected.`));
        console.log(chalk.bold('HTTPS Port:'), chalk.blue(process.env.HTTPS_PORT));
    });

    http.createServer(app).listen(process.env.HTTP_PORT, () => {
        console.log(chalk.underline.green(`${process.env.NAME} HTTP server has connected.`));
        console.log(chalk.bold('HTTP Port:'), chalk.blue(process.env.HTTP_PORT));
    });
}

else if (process.env.NAME === 'http_production') {
    http.createServer(app).listen(process.env.HTTP_PORT, () => {
        console.log(chalk.underline.green(`${process.env.NAME} HTTP server has connected.`));
        console.log(chalk.bold('HTTP Port:'), chalk.blue(process.env.HTTP_PORT));
    });
}

else {
    console.log(chalk.red(
    chalk.bold('Error: invalid environment'),
        'did you forget to add an environment name?'        
    ));
}
