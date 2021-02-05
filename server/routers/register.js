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
const { NoEmitOnErrorsPlugin } = require('webpack');

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


router.post('/register/user', ensureLoggedOut(), async (req, res) => {
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register-user request`);

        // Look for already existing User account
        const existingUser = await User.findOne(
            {email: req.body.email},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return true;
                return false;
            }
        );

        if (existingUser) return res.status(460).send(
            'email address already registered as another User'
        );
        
        // Look for already existing Business account
        const existingBusiness = await Business.findOne(
            {email: req.body.email}, 
            async (err, doc) => {
                if (err) throw err;
                if (doc) return true;
                return false;
            }
        );

        if (existingBusiness) return res.status(461).send(
            'email address already registered as a Business'
        );

        // Register new user
        console.log('Creating user');
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email
        });

        const saveStatus = await newUser.save({}, (err, doc) => {
            if (err) return false;
            return true;
        });

        if (!saveStatus) return res.status(500).send(
            'Something went wrong on our end.'
        );

        // Return new User details
        const resUser = {
            name: newUser.name,
            email: newUser.email,
            type: 'user'
        };

        return res.status(201).send(resUser);
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


router.post('/register/business', ensureLoggedOut(), async (req, res) => {
    try {
        console.log(`Received a${req.secure ? " secure": "n insecure"} /register-business request`);

        // Look for already existing User account
        const existingUser = await User.findOne(
            {email: req.body.email},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return true;
                return false;
            }
        );

        if (existingUser) return res.status(460).send(
            'email address already registered as another User'
        );

        // Look for already existing Business account
        const existingBusiness = await Business.findOne(
            {email: req.body.email}, 
            async (err, doc) => {
                if (err) throw err;
                if (doc) return true;
                return false;
            }
        );

        if (existingBusiness) return res.status(461).send(
            'email address already registered as a Business'
        );

        console.log('Here is req business key', req.body.business_key);
        console.log('config business key', config.business_key);

        // Validate business key
        if (req.body.business_key !== config.business_key) {
            return res.status(462).send(
                'Invalid Business key.'
            );
        }

        // Register new business
        console.log('Creating business');
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newBusiness = new Business({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email
        });

        const saveStatus = await newBusiness.save({}, (err, doc) => {
            if (err) return false;
            return true;
        });

        if (!saveStatus) return res.status(500).send(
            'Something went wrong on our end.'
        );

        // Return new User details
        const resBusiness = {
            name: newBusiness.name,
            email: newBusiness.email,
            type: 'business'
        };

        return res.status(201).send(resBusiness);
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

module.exports = router;