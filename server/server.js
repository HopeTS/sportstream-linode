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
const MongoD = require('./database/mongod');



console.log(chalk.bold('Environment:'), chalk.blue(process.env.NAME));


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


/* Configure express */
const app = express();
app.use(http2https);
app.use(express.static(publicPath));
app.use(express.json());
app.use(mainRouter);


/* Run server */
if (process.env.NAME === 'development') {
    http.createServer(app).listen(config.http.port, () => {        
        console.log(chalk.underline.green('Development HTTP server has connected.'));
        console.log(
            chalk.bold('Port:'),
            chalk.blue(config.http.port)
        );
    });
}

else if (process.env.NAME === 'https_production') {
    https.createServer(app).listen(process.env.HTTPS_PORT, () => {
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
