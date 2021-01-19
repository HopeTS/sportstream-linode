/**
 * Router for handling stream based features
 */

const fetch = require('node-fetch'); 
const axios = require('axios');
const http = require('http');
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

const api_url = config.nms.api_url;
const rtmp_auth = {
    user: config.nms.auth.api_user,
    pass: config.nms.auth.api_pass
};

/**
 * Encrypt stream keys (per single business)
 * 
 * @param {[String]} keys array of keys
 * 
 * @returns encrypted stream key
 */
async function encryptStreamKeys(keys) {
    const encryptedKeys = await Promise.all(keys.map(async (key) => {
        const encryptedKey = await encryptStreamKey(key)
        return encryptedKey;
    }));

    return encryptedKeys;
}

/**
 * Encrypt single stream key
 * 
 * @param {string} key stream key to encrypt
 * 
 * @returns encrypted stream key
 */
async function encryptStreamKey(key) {
    const encryptedKey = await bcrypt.hash(key, 10)
    return encryptedKey
}

/**
 * Route to validate users connected to businesses. Returns an array of 
 * bcrypt(10) encrypted connection ids from connected business accounts
 */
router.get('/streams/user/connect-to-business', ensureLoggedIn(), async (req, res) => {
    try {
        // Collect user
        const user = await User.findOne({_id: req.user},
            (err, doc) => {
                if (err) throw err;
                if (doc) return doc;
                return false;
            }
        );

        // Collect businesses
        const businesses = await Promise.all(user.connected_businesses.map(async (bid) => {
            return await Business.findOne({_id: bid},
                (err, doc) => {
                    if (err) throw err;
                    if (doc) return doc;
                    return false;
                }
            );
        }));

        // create individual business connection documents
        const businessDocuments = await Promise.all(businesses.map(async (business) => {
            const encrypted_keys = await encryptStreamKeys(business.stream_key);
            return {
                id: business._id,
                keys: encrypted_keys
            }
        }));

        res.status(200).send({encrypted_keys: businessDocuments});
    } 
    
    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

/**
 * Use encrypted stream keys from user -> business connection to return 
 * unencrypted stream key for available streams. 
 * 
 * @returns [{
 *  business_id (String): ID of business,
 *  business_name (String): Name of the business,
 *  current_streams (Array): List of unencrypted stream keys for current streams
 * }]
 */
router.post('/streams/user/get-current-streams', ensureLoggedIn(), async (req, res) => {
    try {
        if (!req.body) res.status(400).send('Empty request body');
        console.log('In current streams route')
        const data = req.body.encrypted_keys;
        let result;

        // Get businesses with matching ids
        const businesses = await Promise.all(data.map(async (business) => {
            return await Business.findOne({_id: business.id},
                (err, doc) => {
                    if (err) throw err;
                    if (doc) return doc;
                    return false;
                }
            );
        }));

        // Get list of keys that are currently streaming
        const usernamePasswordBuffer = `${rtmp_auth.user}:${rtmp_auth.pass}`;
        const base64data = usernamePasswordBuffer.toString('base64');
        const axiosObject = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64data}`
            }
        });
        stream_data = await axios.get(api_url,  {}, axiosObject)

        .then((res) => {
            return res;
        })

        .catch((err) => {
            console.log('fail 1');
        });

        console.log('API url', api_url);
        console.log('Username being sent:', rtmp_auth.user);
        console.log('Password being sent:', rtmp_auth.pass);

        stream_data = await axios.get(api_url,  {}, {
            withCredentials: true,
            auth: {
                username: rtmp_auth.user,
                password: rtmp_auth.pass
            }
        })

        .then((res) => {
            return res;
        })

        .catch((err) => {
            console.log('fail 2');
        });

        console.log('Trying fetch...');

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Basic ${base64data}`);

        const api_req = new Request(api_url, {
            method: 'GET',
            headers: headers,
            credentials: 'same-origin'
        });

        console.log(api_req)

        fetch(api_req)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('FUCK!');
            }
        })

        .then((jsonData) => {
            console.log('Callback chain data', jsonData);
        })

        .catch((err) => {
            console.log('Fail 3');
        })

        console.log('Here is stream api data', stream_data);

        // Filter out current stream keys per business


        return res.send();
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

module.exports = router;