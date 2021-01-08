/*
 *  Router for development functions
 */

const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

const http2https = require('../middleware/http2https');
const generateStreamKey = require('../auth/keygen').generateStreamKey;
const generateConnectionID = require('../auth/keygen').generateConnectionID;
const config = require('../config/default');
const User = require('../database/schema/Schema').User;
const Business = require('../database/schema/Schema').Business;

const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');


/* Router */
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Route to drop User collection
 */
router.get('/clear-users', (req, res) => {
    try {
        // TODO: Clear users
        return
    } catch(e) {
        res.send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

/**
 * Route to drop Business collection
 */
router.get('/clear-businesses', (req, res) => {
    try {
        // TODO: Clear businesses
        return
    } catch(e) {
        res.send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

/**
 * Route to add test Businesses
 */
router.get('/add-test-businesses', (req, res) => {
    try {
        // TODO: Add two Businesses
        return
    } catch(e) {
        res.send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
})

/**
 * Route to add test Users
 */
router.get('/add-test-users', (req, res) => {
    try {
        // TODO: Add two Users with one connected to a Business
        return
    } catch(e) {
        res.send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


module.exports = router;