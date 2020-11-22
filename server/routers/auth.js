/*
 *  Router handling authentication endpoints
 */

/* External packages */
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;


/* Internal packages */
const http2https = require('../middleware/http2https');
const User = require('../database/schema/Schema').User;


/* Paths */
const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');


/* Router */
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/login', (req, res) => {
    /**
     * Login page
     */

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

router.post('/login', (req, res, next) => {
    /**
     * Route to handle logging in with username and password
     */
    passport.authenticate("local", (err, user, info) => {

        // Error handling
        if (err) throw err;
        if (!user) res.status(404).send("No User Exists");

        // Sign in
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.cookie('user', user.id, {maxAge: 2592000000 }); // 1 Month
                res.status(202).send(user);
            });
        }
    })(req, res, next);
});

router.get('/logout', ensureLoggedIn(), (req, res) => {
    /**
     * Route to clear authentication cookie
     */

    res.clearCookie('user');
    res.send();
});

router.get('/register', ensureLoggedOut(), (req, res) => {
    /**
     * Route to register form
     */
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

router.post('/register', ensureLoggedOut(), (req, res) => {
    /**
     * Route to register a new account in the database
     */
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register request`);
        User.findOne({email: req.body.email}, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send("User already exists!");
            if (!doc) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                console.log(hashedPassword)
                const newUser = new User({
                    name: req.body.name,
                    username: req.body.email,
                    email: req.body.email,
                    type: req.body.type,
                    password: hashedPassword,
                });
                await newUser.save();
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

// Logging in from cookie too risky for now
/*
router.post('/user', (req, res) => {
    try {
        await User.findOne({_id: req.user}, async (err, doc) => {

            // Error handling
            if (err) throw err;
            if (!doc) return res.status(404).send();

            // Sign in
            else {
                req.logIn(user)
            }
        });

    } catch(e) {
        res.status(500).send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
})
*/

module.exports = router;