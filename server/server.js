/* Packages */
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');


/* Local files */
const publicPath = path.join(__dirname, '../public');
const mainRouter = require('./routers/app');


/* Environment variables */
const port = process.env.PORT;
const env = process.env.NAME;

console.log(
    chalk.bold('Environment:'),
    chalk.green(process.env.NAME)
);


/* Configure express */
const app = express();
app.use(express.static(publicPath));
app.use(express.json());
app.use(mainRouter);


/* Run server */
if (env === 'development') {  // Dev environment
    http.createServer(app).listen(port, () => {
        console.log(chalk.bold.underline.green('Development server is up!'));
        console.log(
            chalk.bold('Port:'),
            chalk.green(process.env.PORT)
        );
    });
}

else if (env === 'production') {      // Prod environment
    const httpsOptions = {
        cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
        key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    };

    https.createServer(httpsOptions, app).listen(port, () => {
        console.log(chalk.bold.underline.green('Production server is up'));
        console.log(
            chalk.bold('Port:'),
            chalk.green(process.env.PORT)
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
