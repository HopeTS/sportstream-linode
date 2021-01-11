/**
 * The router for handling and updating account information.
 */

const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;
const generateStreamKey = require('../auth/keygen').generateStreamKey;

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');


/* Router */
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handles the change email function
 */
router.post('/change-email', (req, res) => {
    // TODO: plan strategy and structure of this endpoint
    return res.send();
});

/**
 * Handles the change password function
 */
router.post('/change-password', (req, res) => {
    // TODO: plan strategy and structure of this endpoint
    return res.send();
});

/**
 * Handles the add stream key function
 */
router.post('/add-stream-key', (req, res) => {
    // TODO: plan strategy and structure of this endpoint

    return res.send();
});

router.post('/delete-stream-key', (req, res) => {
    // TODO

    return res.send();
});


module.exports = router;