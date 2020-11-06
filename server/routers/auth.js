const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');

const router = new express.Router();


router.post('/login', (req, res) => {
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


router.post('/register', (req, res) => {
    try {
        if (!req.body) res.redirect('/register');
        res.redirect('/login')
    
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