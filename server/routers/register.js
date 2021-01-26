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


router.get('/register', ensureLoggedOut(), (req, res) => {
    try {
        return res.sendFile(appRoute);
    
    } catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


router.post('/register/user', ensureLoggedOut(), (req, res) => {
    try {
        // TODO
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


router.post('/register/business', ensureLoggedOut(), (req, res) => {
    try {
        // TODO
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

module.exports = router;