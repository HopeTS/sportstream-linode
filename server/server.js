/* Packages */
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const mongoose = require('mongoose');


/* Local files */
const publicPath = path.join(__dirname, '../public');
const mainRouter = require('./routers/app');
const config = require('./config/default');

const RenewSSLCert = require('./cron/renew-ssl-cert');
const MongoD = require('./database/mongod');


/* Environment variables */
const http_port = config.http.port;
const mongodb_port = config.mongodb.port;
const mongodb_path = config.mongodb.path;
const env = process.env.NAME;

console.log(chalk.bold('Environment:'), chalk.green(process.env.NAME));


/* Connect to MongoDB */
mongod = new MongoD(config.mongodb);
mongod.create_connection();
mongoose.connect(
    `mongodb://localhost:${mongodb_port}/sportstream-linode`,
    {useNewUrlParser: true}
);
const db = mongoose.connection;
db.once('open', () => {
    console.log(chalk.green('Mongoose has connected to MongoDB'))
})


/* Cron jobs */
const ssl_cron = new RenewSSLCert;


/* Configure express */
const app = express();
app.use(express.static(publicPath));
app.use(express.json());
app.use(mainRouter);


/* Run server */
if (env === 'development') {
    http.createServer(app).listen(http_port, () => {        
        console.log(chalk.bold.underline.green('Development server is up!'));
        console.log(
            chalk.bold('Port:'),
            chalk.green(http_port)
        );
    });
}

else if (env === 'production') {
    const httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    };

    ssl_cron.start();

    https.createServer(httpsOptions, app).listen(http_port, () => {
        console.log(chalk.bold.underline.green('Production server is up'));
        console.log(
            chalk.bold('Port:'),
            chalk.green(http_port)
        );
    });
}

else {
    console.log(
        chalk.red(
            chalk.bold('Error: invalid environment'),
            'did you forget to add an environment name?'
        )
    );
}
