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
 * Get stream information available to a User
 * (Endpoint for Stream.get_user_doc())
 */
router.get('/stream/get-user-doc', ensureLoggedIn(), async (req, res) => {
    try {
        console.log('streams/get-user-doc req.data', req.data);
        return res.status(200).send();
    }

    catch(e) {
        console.error(e);
        return res.status(500).send();
    }
});

/**
 * Endpoint for HLS stream
 */
router.get('/stream/hls/:key', ensureLoggedIn(), async (req, res) => {
    try {
        console.log('Stream key listed:', req.params.key);
    }

    catch(e) {
        console.error(e);
        res.status(500).send();
    }
})

module.exports = router;