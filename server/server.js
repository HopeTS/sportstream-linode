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
const http2https = require('./middleware/http2https');
const config = require('./config/default');

const RenewSSLCert = require('./cron/renew-ssl-cert');
const MongoD = require('./database/mongod');



console.log(chalk.bold('Environment:'), chalk.blue(config.name));


/* Connect to MongoDB */
mongod = new MongoD(config.mongodb);
mongod.create_connection();
mongoose.connect(
    `mongodb://localhost:${config.mongodb.port}/sportstream-linode`,
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
app.use(http2https);
app.use(express.json());
app.use(mainRouter);


/* Run server */
if (config.name === 'development') {
    http.createServer(app).listen(config.http.port, () => {        
        console.log(chalk.underline.green('Development HTTP server has connected.'));
        console.log(
            chalk.bold('Port:'),
            chalk.blue(config.http.port)
        );
    });
}

else if (config.name === 'production') {
    const httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    };

    ssl_cron.start();   //Automatic SSL cert renewal

    https.createServer(httpsOptions, app).listen(config.http.port, () => {
        console.log(chalk.underline.green('Production HTTPS server has connected.'));
        console.log(chalk.bold('Port:'), chalk.blue(config.http.port));
    });

    http.createServer(app).listen(80, () => {
        console.log(chalk.underline.green('HTTP port up for secure redirection'));
    });
}

else {
    console.log(chalk.red(
    chalk.bold('Error: invalid environment'),
        'did you forget to add an environment name?'        
    ));
}
