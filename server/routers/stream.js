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

/**
 * Endpoint for HLS stream
 */
router.get('/stream/hls/:key', ensureLoggedIn(), async (req, res) => {
    try {
        console.log('Stream key listed:', req.params.key);

        const hlsUrl = `http://localhost:8000/live/${req.params.key}/index.m3u8`;
        request(hlsUrl).pipe(res);

        // Set headers
        /* res.header("Access-Control-Allow-Origin", nmsConfig.http.allow_origin);
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("Access-Control-Allow-Credentials", true); */

        /* const options = {
            port: '8000',
            hostname: 'localhost',
            path: `/${req.paramas.key}/index.m3u8`,
            headers: req.headers
        };

        const callback = http.request(options, pres => {
            res.writeHead(pres.statusCode);

            pres.on('data', (chunk) => {
                res.write(chunk);
            })

            pres.on('close', () => {
                res.end();
            })

            pres.on('end', () => {
                res.end();
            })
        })
        .on('error', (e) => {
            console.error(e.message);
            try {
                // attempt to set error message and http status
                ores.writeHead(500);
                ores.write(e.message);
            } catch (e) {
                // ignore
            }
            res.end();
        }) */

        /* return res.status(206).send(
            `http://localhost:8000/live/${req.params.key}/index.m3u8`
        ); */
        /* return res.status(206).redirect(
            `http://localhost:8000/live/${req.params.key}/index.m3u8`
        ); */
    }

    catch(e) {
        console.error(e);
        res.status(500).send();
    }
})

module.exports = router;