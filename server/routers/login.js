const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

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
    passport.authenticate('userLogin', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(404).send('No user exists');

        else {
            req.login(user, (err) => {
                if (err) throw err;
                res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                res.status(202).send(user);
            });
        }
    })(req, res, next);
});


router.post('/login/business', (req, res, next) => {
    passport.authenticate('businessLogin', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(404).send("No Business exists");

        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                res.status(202).send(user);
            })
        }
    })(req, res, next);
});


router.get('/login/status', ensureLoggedIn(), (req, res) => {
    res.status(210).send();
});

module.exports = router;