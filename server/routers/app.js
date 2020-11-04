const express = require('express');
const path = require('path');
const chalk = require('chalk');

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');
const http2https = require('../middleware/http2https');

const router = new express.Router();


router.get('/', http2https, (req, res) => {
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} request`);
        return res.sendFile(appRoute);
    
    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});

router.get('/*', http2https, (req, res) => {
    try {
        return res.sendFile(appRoute);

    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});


module.exports = router;