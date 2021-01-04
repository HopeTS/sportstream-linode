/*
 *  Router handling authentication endpoints
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
 * Login page
 */
router.get('/login', (req, res) => {

    try {
        // If not logged in
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


/**
 * Route to log in User account
 */
router.post('/login-user', (req, res, next) => {
    passport.authenticate('userLogin', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(404).send("No User exists");

        // Log in
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                res.status(202).send(user);
            });
        }
    })(req, res, next);
});


/**
 * Route to log in Business account
 */
router.post('/login-business', (req, res, next) => {
    passport.authenticate('businessLogin', (err, user, info) => {
        if (err) throw err;
        if (!user) res.status(404).send("No User exists");

        // Log in
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                res.status(202).send(user);
            })
        }
    })(req, res, next);
});


/**
 * Route to clear authentication cookie
 */
router.get('/logout', ensureLoggedIn(), (req, res) => {

    res.clearCookie('user');
    res.send();
});


/**
 * Route to register form
 */
router.get('/register', ensureLoggedOut(), (req, res) => {
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


/**
 * Route to register a new User account in the database
 */
router.post('/register-user', ensureLoggedOut(), (req, res) => {
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register-user request`);
        User.findOne({email: req.body.email}, async (err, doc) => {

            // Error handling
            if (err) throw err; 
            if (doc) res.send("User account already exists!");

            // Register new user
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                // Store user
                const newUser = new User({
                    name: req.body.name,
                    password: hashedPassword,
                    email: req.body.email,
                    connected_businesses: [],
                    type: 'user'
                });
                await newUser.save();
                res.status(201).send('User account created');
            }
        })
    } catch(e) {
        res.status(500).send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});


/**
 * Route to register a new Business account in the database
 */
router.post('/register-business', ensureLoggedOut(), (req, res) => {
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register-business request`);
        User.findOne({email: req.body.email}, async (err, doc) => {

            // Error handling
            if (err) throw err; 
            if (doc) res.send("Business account already exists!");

            // Register new business
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const streamKeys = [
                    generateStreamKey(),
                    generateStreamKey(),
                    generateStreamKey()
                ];

                // Business registration
                if (req.body.type == 'business') {
                    const connection_id = Math.random().toString(36)
                        .replace(/[^a-z]+/g, '').substr(0, 5);

                    const newBusiness = new Business({
                        name: req.body.name,
                        username: req.body.email,
                        email: req.body.email,
                        type: req.body.type,
                        password: hashedPassword,
                        connection_id: connection_id,
                        stream_key: streamKeys
                    });
                    await newBusiness.save();
                    res.status(201).send('Business account created');
                }
            }
        })
    } catch(e) {
        res.status(500).send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});


/**
 * Route to confirm authentication status on the server
 */
router.get('/ensure-login', ensureLoggedIn(), (req, res) => {
    console.log('User is logged in')
    res.status(202).send();
});


module.exports = router;