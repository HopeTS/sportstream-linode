export {};
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut;

const config = require('../../config/default');
const User = require('../../database/schema/Schema').User;
const Business = require('../../database/schema/Schema').Business;

const publicPath = path.join(__dirname, '../../../public/');
const appRoute = path.join(publicPath, 'index.html');


// Router config
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/register', ensureLoggedOut(), (req: any, res: any) => {
    try {
        return res.sendFile(appRoute);
    
    } catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


router.post('/register/user', ensureLoggedOut(), async (req: any, res: any) => {
    try {

        // Look for already existing User account
        const existingUser = await User.findOne(
            {email: req.body.email},
            async (err: any, doc: any) => {
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
            async (err: any, doc: any) => {
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

        const newUser = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });

        // Return new User details
        const resUser = {
            name: newUser.name,
            email: newUser.email,
            type: 'user'
        };

        await newUser.save();
        return res.status(201).send(resUser);
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});


router.post('/register/business', ensureLoggedOut(), async (req: any, res: any) => {
    try {

        // Look for already existing User account
        const existingUser = await User.findOne(
            {email: req.body.email},
            async (err: any, doc: any) => {
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
            async (err: any, doc: any) => {
                if (err) throw err;
                if (doc) return true;
                return false;
            }
        );

        if (existingBusiness) return res.status(461).send(
            'email address already registered as a Business'
        );

        // Validate business key
        if (req.body.business_key !== config.business_key) {
            return res.status(462).send(
                'Invalid Business key.'
            );
        }

        // Register new business
        const newBusiness = new Business({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });

        // Return new User details
        const resBusiness = {
            name: newBusiness.name,
            email: newBusiness.email,
            type: 'business'
        };

        await newBusiness.save();
        return res.status(201).send(resBusiness);
    }

    catch(e) {
        res.status(500).send(  );
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

module.exports = router;