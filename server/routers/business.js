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
 *      connection IDs
 * }
 */
router.get('/business/info', ensureLoggedIn(), async (req, res) => {
    try {
        console.log('business/info endpoint req', req)
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(500).send();

        const personalDoc = await business.get_personal_doc();
        console.log('Found business doc, here is personal doc', personalDoc);

        return res.status(200).send(personalDoc);
    } 
    
    catch (e) {
        return res.status(500).send();
    }
    // TODO
    console.log('business/info called')
    return res.send();
});

/**
 * Creates a stream with the given data
 */
router.post('/business/create-stream', ensureLoggedIn, async (req, res) => {
    // TODO (req.body.stream)
});




module.exports = router;