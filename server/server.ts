export {};
/**
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
const cookieParser = require('cookie-parser');

const publicPath = path.join(__dirname, '../public');
const http2https = require('./middleware/http2https');
const config = require('./config/default');
const MongoD = require('./database/mongod');
const node_media_server = require('./media_server');

const devDatabaseConfig = require('./startupScripts/devDatabaseConfig');

const homeRouter = require('./routers/home');
const dashboardRouter = require('./routers/dashboard');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const registerRouter = require('./routers/register');
const userRouter = require('./routers/user');
const businessRouter = require('./routers/business');
const streamRouter = require('./routers/stream');
const watchRouter = require('./routers/watch');
const wildcardRouter = require('./routers/wildcard');

console.log(chalk.bold('Environment:'), chalk.blue(process.env.NAME));


// Connect to MongoDB
const mongod = new MongoD(config.mongodb);
mongod.create_connection();
mongoose.connect(
    `mongodb://localhost:${config.mongodb.port}/${config.mongodb.dbname}`,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;
db.once('open', () => {
    console.log(chalk.green('Mongoose has connected to MongoDB'));
    console.log(chalk.bold('MongoDB port: '), chalk.blue(config.mongodb.port));
    console.log(chalk.bold('MongoDB name: '), chalk.blue(config.mongodb.dbname));
});    


// Configure express
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
app.use(streamRouter);
app.use(watchRouter);
app.use(wildcardRouter);


// Run startup scripts
switch (process.env.NAME) {

    case 'development':
        console.log(chalk.blue('Setting up development database'));
        devDatabaseConfig()
        
        .then((res: boolean) => {
            if (res) console.log(chalk.green('Dev DB config successful'));
            else console.log(chalk.red('Dev DB config unsuccessful'));
        })
        
        .catch((error: any) => {
            console.log(chalk.red('Something went wrong with dev DB config'));
            console.error(error);
        });

    default:
        console.log(chalk.blue('Not running any startup scripts.'))
}


// Run server
switch (process.env.NAME) {

    case 'development':
        http.createServer(app).listen(process.env.HTTP_PORT, () => {        
            console.log(chalk.underline.green('Development HTTP server has connected.'));
            console.log(
                chalk.bold('HTTP Port:'),
                chalk.blue(process.env.HTTP_PORT)
            );
        });
        node_media_server.run();


    case 'https_production':
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
    
        node_media_server.run();


    case 'http_production':
        http.createServer(app).listen(process.env.HTTP_PORT, () => {
            console.log(chalk.underline.green(`${process.env.NAME} HTTP server has connected.`));
            console.log(chalk.bold('HTTP Port:'), chalk.blue(process.env.HTTP_PORT));
        });
    
    default:
        console.log(chalk.red(
            chalk.bold('Error: invalid environment'),
            'did you forget to add an environment name?'        
        ));
}