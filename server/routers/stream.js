const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const http = require('http');
const request = require('request');

const http2https = require('../middleware/http2https');
const config = require('../config/default');
const nmsConfig = require('../config/media_server');
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

router.get('stream/get-flv/:key', ensureLoggedIn(), async (req, res) => {
    try {
        if (!req.params.key) return res.status(400).send();

        const internalStreamUrl = `http://localhost:8000/live/${req.params.key}.flv`;
        const httpsInternalStreamUrl = `https://localhost:8443/live/${req.params.key}.flv`;
        request(httpsInternalStreamUrl).pipe(res);
    }

    catch(e) {
        console.error(e);
        return res.status(500).send();
    }
});
module.exports = router;