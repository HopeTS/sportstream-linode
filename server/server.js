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

const publicPath = path.join(__dirname, '../public');
const mainRouter = require('./routers/app');
const config = require('./config/default');

const RenewSSLCert = require('./cron/renew-ssl-cert');
const MongoD = require('./database/mongod');


const http_port = config.http.port;
const mongodb_port = config.mongodb.port;
const mongodb_path = config.mongodb.path;
const env = process.env.NAME;

console.log(chalk.bold('Environment:'), chalk.blue(process.env.NAME));


/* Connect to MongoDB */
mongod = new MongoD(config.mongodb);
mongod.create_connection();
mongoose.connect(
    `mongodb://localhost:${mongodb_port}/sportstream-linode`,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const db = mongoose.connection;
db.once('open', () => {
    console.log(chalk.green.dim('Mongoose has connected to MongoDB'))
});    


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
        console.log(chalk.underline.green('Development HTTP server has connected.'));
        console.log(
            chalk.bold('Port:'),
            chalk.blue(http_port)
        );
    });
}

else if (env === 'production') {
    const httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    };

    ssl_cron.start();   //Automatic SSL cert renewal

    https.createServer(httpsOptions, app).listen(http_port, () => {
        console.log(chalk.underline.green('Production HTTPS server has connected.'));
        console.log(
            chalk.bold('Port:'),
            chalk.green(http_port)
        );
    });
    
    /* Create HTTP redirect */
    const http_app = express();
    http_app.use(mainRouter);    
    http_app.listen(8080);
}

else {
    console.log(chalk.red(
    chalk.bold('Error: invalid environment'),
        'did you forget to add an environment name?'        
    ));
}
