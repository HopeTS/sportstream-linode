const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

const http2https = require('../middleware/http2https');
const config = require('../config/default');
const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');


/* Router */
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/login', (req, res) => {
    try {
        return res.sendFile(appRoute);
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured:\n'), e);
    }
});


router.post('/login/user', (req, res, next) => {
    try {
        passport.authenticate('userLogin', (err, user, info) => {
            if (err) throw err;
            if (!user) res.status(404).send();
    
            else {
                req.login(user, (err) => {
                    if (err) throw err;
                    res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                    res.status(202).send(user);
                });
            }
        })(req, res, next);
    }

    catch(error) {
        return res.status(500).send();
    }
});


router.post('/login/business', (req, res, next) => {
    try {
        passport.authenticate('businessLogin', (err, user, info) => {
            if (err) throw err;
            if (!user) res.status(404).send();
    
            else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                    res.status(202).send(user);
                });
            }
        })(req, res, next);
    }

    catch(error) {
        return res.status(500).send();
    }
});


router.get('/login/status', ensureLoggedIn(), (req, res) => {
    res.status(210).send();
});

module.exports = router;