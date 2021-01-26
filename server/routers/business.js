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
const Stream = require('../database/schema/Schema').Stream;

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');


/* Router */
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


/**
 * Get all information available to business account
 * 
 * @returns {object} {
 *      name
 *      email
 *      streams
 *          upcoming
 *          current
 *          previous
 *      connected users (the business public docs)
 * }
 */
router.get('/business/info', ensureLoggedIn(), (req, res) => {
    // TODO
    console.log('business/info called')
    return res.send();
});


module.exports = router;