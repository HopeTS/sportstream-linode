/**
 * Router for handling stream based features
 */

 const axios = require('axios');
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
        console.log('What')
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

        console.log('get-current-streams here are connected businesses', businesses);

        // Get list of keys that are currently streaming
        const usernamePasswordBuffer = Buffer.from(rtmp_auth.user + ":" + rtmp_auth.pass);
        const base64data = usernamePasswordBuffer.toString('base64');
        const axiosObject = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64data}`
            }
        });
        const stream_data = await axios.get(api_url,  {}, axiosObject)

        .then((res) => {
            console.log('Strem data =', res)
            return res;
        })

        .catch((err) => {
            console.log(err);
        });

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