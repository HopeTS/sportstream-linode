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


/**
 * Get all information available to user account
 * 
 * @returns {object} {
 *      name
 *      email
 *      connected businesses (the business public docs)
 * }
 */
router.get('/user/info', (req, res) => {
    // TODO
});


/**
 * Get all information about businesses available to user account
 * 
 * @returns {Array} [
 *      connected businesses (the business public docs)
 * ]
 */
router.get('/user/business-info', (req, res) => {
    // TODO
});


/**
 * Connect a user to a business
 * 
 * @returns {boolean} true if successful, else false
 */
router.get('/user/connect-to-business', (req, res) => {
    // TODO
})


module.exports = router;