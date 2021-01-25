/*
 *  Router handling static content endpoints
 */

const express = require('express');
const path = require('path');
const chalk = require('chalk');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');


/* Router */
const router = new express.Router();

router.get('/', (req, res) => {
    try {
        return res.sendFile(appRoute);
    } 
    
    catch(e) {
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
        res.status(500).send();
    }
});

router.get('/watch', ensureLoggedIn(), (req, res) => {
    try {
        return res.sendFile(appRoute);
    }

    catch(e) {
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
        res.status(500).send();
    }
})


module.exports = router;