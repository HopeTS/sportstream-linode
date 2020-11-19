/*
 *  Router handling wildcard routes
 */

 
/* External packages */
const express = require('express');
const path = require('path');
const chalk = require('chalk');


/* Paths */
const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');


/* Router */
const router = new express.Router();

router.get('/*', (req, res) => {
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