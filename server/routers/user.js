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
router.get('/user/get-personal-doc', ensureLoggedIn(), async (req, res) => {
    try {
        // Find User account
        const user = await User.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!user) return res.status(404).send();

        // Get info
        const personalDoc = await user.get_personal_doc();
        console.log('Found user doc, here is personal doc', personalDoc);

        return res.status(200).send(personalDoc);
    } 
    
    catch (e) {
        return res.status(500).send();
    }
});

router.get('/user/get-business-doc', ensureLoggedIn(), async (err, doc) => {
    try {
        // Find User account
        const user = await User.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!user) return res.status(404).send();

        // Get info
        const businessDoc = await user.get_business_doc();
        console.log('Found user doc, here is business doc', businessDoc);

        return res.status(200).send(businessDoc);
    } 
    
    catch (e) {
        return res.status(500).send();
    }
});

/**
 * 
 */
router.get('/user/get-connected-businesses', ensureLoggedIn(), async (err, doc) => {
    try {
        // Find User account
        const user = await User.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!user) return res.status(404).send();

        // Get info
        const connectedBusinesses = await user.get_connected_businesses();
        console.log('Here are connected businesses', connectedBusinesses);

        return res.status(200).send(connectedBusinesses);
    } 
    
    catch (e) {
        return res.status(500).send();
    }
});



module.exports = router;