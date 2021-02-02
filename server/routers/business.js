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
 * Get all information available to business account.
 * (endpoint for Business.get_personal_doc())
 * 
 * @returns {{
 *      name: String,
 *      email: String,
 *      streams: {
 *          upcoming: [String],
 *          current: [String],
 *          previous: [String]
 *      },
 *      connected_users: [String],
 *      connection_ids: [String]
 * }} 
 */
router.get('/business/get-personal-doc', ensureLoggedIn(), async (req, res) => {
    try {
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(404).send();

        const personalDoc = await business.get_personal_doc();
        console.log('Found business doc, here is personal doc', personalDoc);

        return res.status(200).send(personalDoc);
    } 
    
    catch (e) {
        console.error(e);
        return res.status(500).send();
    }
});

/**
 * Returns Business information available to Users connected to the Business
 */
router.get('/business/get-user-doc', ensureLoggedIn(), async (req, res) => {
    try {
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(404).send();

        const userDoc = await business.get_user_doc();
        console.log('Found business doc, here is user doc', userDoc);

        return res.status(200).send(userDoc);
    } 
    
    catch (e) {
        return res.status(500).send();
    }
});

/**
 * Returns User business information for all Users connected to the Business
 */
router.get('/business/get-connected-users', ensureLoggedIn(), async (req, res) => {
    try {
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(404).send();

        const connectedUsers = await business.get_connected_users();
        console.log('Found connected users', connectedUsers);

        return res.status(200).send(connectedUsers);
    } 
    
    catch (e) {
        return res.status(500).send();
    }
});

/**
 * Gets upcoming streams
 */
router.get('/business/get-upcoming-streams', ensureLoggedIn(), async (req, res) => {
    try {
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(404).send();

        const upcomingStreams = await business.get_upcoming_streams();
        console.log('Found upcoming streams', upcomingStreams);

        return res.status(200).send(upcomingStreams);
    }

    catch(e) {
        return res.status(500).send();
    }
});

/**
 * Creates a stream with the given data
 * 
 * @param {{
 *      field: String,
 * }}
 */
router.post('/business/create-stream', ensureLoggedIn(), async (req, res) => {
    // TODO (req.body.stream)
    console.log('create stream called', req.data);
    
    try {
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(404).send();

        const stream = await business.create_stream(req.body.stream);
        console.log('Here is the generated stream', stream);

        return res.status(201).send(stream);
    }

    catch(e) {
        console.error(e);
        return res.status(500).send();
    }
});

/**
 * Generates and sends new connection ID
 */
router.post('/business/generate-connection-id', ensureLoggedIn(), 
    async (req, res) => {
        try {
            // Find Business account
            const business = await Business.findOne(
                {_id: req.user},
                async (err, doc) => {
                    if (err) throw err;
                    if (doc) return doc;
                    return false;
                }
            );
            if (!business) return res.status(404).send();

            const newId = await business.generate_connection_id();
            if (!newId) return res.status(500).send();
            return res.status(201).send(newId);
        }

        catch(e) {
            console.log(e);
            return res.status(500).send(); 
        }
    }
);

/**
 * Connects User to Business (DO NOT USE YET, connections only supported from
 * User to Business)
 */
router.post('business/connect-user', ensureLoggedIn(), async (err, doc) => {
    if (!req.body.user) return res.status(400).send();

    try {
        // Find Business account
        const business = await Business.findOne(
            {_id: req.user},
            async (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );
        if (!business) return res.status(404).send();

        const saveStatus = await business.connect_user(req.body.user);
        if (!saveStatus) return res.status(400).send();
    }

    catch(e) {
        console.log(e);
        return res.status(500).send(); 
    }
});




module.exports = router;