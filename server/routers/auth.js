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
 * Login page
 */
router.get('/login', (req, res) => {

    try {
        // If not logged in
        return res.sendFile(appRoute);
    
    } catch(e) {
        res.send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
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
        if (!user) res.status(404).send("No Business exists");

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
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


/**
 * Route to register a new User account in the database
 * 
 * The req body contains:
 *  - email: the email
 *  - name: The person's name
 *  - password: the password
 *  - business_password?: password to connect to a business via the business
 *      connection_id
 */
router.post('/register-user', ensureLoggedOut(), (req, res) => {
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register-user request`);
        User.findOne({email: req.body.email}, async (err, doc) => {
            // Error handling
            if (err) throw err; 
            if (doc) res.status(409).send("User account already exists!");

            // Register new user
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                // Connect to business
                // TODO: Connect to business
                let connected_businesses = [];
                if (req.body.business_password.length > 0) {
                    console.log('There is a business password here')
                    // TODO: Query business database to find a connection_id 
                    //       that matches this password
                    
                    // Query Businesses for connection_id == business_password
                    Business.findOne({connection_id: req.body.business_password}, 
                        async (err, doc) => {
                            if (err) throw err;
                            
                            if (doc) {
                                console.log('Business with matching id found!');
                                console.log(doc);
                            } else {
                                console.log('Business with matching id not found!')
                            }
                        }
                    );
                }

                // Store user
                const newUser = new User({
                    name: req.body.name,
                    password: hashedPassword,
                    email: req.body.email,
                    connected_businesses: connected_businesses,
                    type: 'user'
                });
                await newUser.save((err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Something went wrong on our end.');
                    };
                });

                // Return new user details
                const resUser = {
                    name: newUser.name,
                    email: newUser.email,
                    connected_businesses: newUser.connected_businesses,
                    type: 'user'
                }
                res.status(201).send(resUser);
            }
        })
    } 
    
    catch(e) {
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
        res.status(500).send('Something went wrong on our end.');
    }
});


/**
 * Route to register a new Business account in the database
 * 
 * The req body contains:
 *  - email: The company email
 *  - name: The company name
 *  - business_key: The business key that allows a Business account to
 *      actually register
 *  - connection_id: The connection id (The password to give to user's to
 *      enable access to the company streams)
 */
router.post('/register-business', ensureLoggedOut(), (req, res) => {
    try {
        console.log('Here is the request', req.body)
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register-business request`);
        Business.findOne({email: req.body.email}, async (err, doc) => {
            // Error handling
            if (err) throw err; 
            if (doc) {
                return res.status(409).send("Business account already exists!");
            }
            if (req.body.business_key != config.business_key) {
                return res.status(401).send('Invalid business_key');
            }


            // Register new business
            if (!doc) {
                console.log('Saving business')
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const newBusiness = new Business({
                    name: req.body.name,
                    username: req.body.email,
                    email: req.body.email,
                    type: 'business',
                    password: hashedPassword
                });

                await newBusiness.save((err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Something went wrong on our end.');
                    };
                });

                // Return new business details
                const resBusiness = {
                    name: newBusiness.name,
                    username: newBusiness.username,
                    email: newBusiness.email,
                    type: 'business'
                }
                return res.status(201).send(resBusiness);
            }
        })
    } 
    
    catch(e) {
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
        return res.status(500).send('Something went wrong on our end.');
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