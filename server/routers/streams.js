/**
 * Router for handling stream based features
 */

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

/**
 * Encrypt stream keys
 * 
 * @returns encrypted stream key
 */
async function encryptStreamKeys(keys) {
    const encryptedKeys = keys.map(async (key) => {
        const encryptedKey = await encryptStreamKey(key)
        console.log('[esks] key:', encryptedKey);
        return encryptedKey;
    })

    await Promise.all(encryptedKeys);
    /* for (var i=0; i<keys.length; i++) {
        encryptStreamKey(keys[i])
        
        .then(function(encryptedKey) {
            encryptedKeys.push(encryptedKey);
        })

        .catch(function(err) {
            console.error(err);
        })
    } */
    console.log('[esks] Here are the encrypted keys', encryptedKeys);
    return encryptedKeys;
}

/**
 * Encrypt stream key
 * 
 * @returns encrypted stream key
 */
async function encryptStreamKey(key) {
    const encryptedKey = await bcrypt.hash(key, 10)
    console.log('[esk] encrypted key:', encryptedKey);
    return encryptedKey
}

/**
 * Route to validate users connected to businesses. Returns an array of 
 * bcrypt(10) encrypted connection ids from connected business accounts
 */
router.get('/streams/user-to-business', ensureLoggedIn(), async (req, res) => {
    try {
        // If not logged in
        console.log('Here is the user', req.user);
        User.findOne({_id: req.user},
            async (err, doc) => {
                if (err) throw err;

                if (doc) {
                    // Gather all associated businesses
                    const business_keys = [];
                    doc.connected_businesses.forEach((bid) => {
                        console.log('Looking for business', bid);
                        Business.findOne({_id: bid},
                            (err, bus) => {
                                if (err) throw err;

                                if (bus) {
                                    console.debug('Here is the connected business', bus);
                                    encryptStreamKeys(bus.stream_key)
                                    
                                    .then(function(encryptedKeys) {
                                        console.log('[route] keys cb', encryptedKeys);

                                        business_keys.push({
                                            id: bus._id,
                                            keys: encryptedKeys
                                        });
                                    });  
                                }
                            }
                        );
                    })

                } 
                
                else {
                    console.debug('No user found')
                    return res.status(404).send();
                }
            }
        );

        return res.sendFile(appRoute);
    
    } catch(e) {
        res.send();
        console.log(chalk.red('An error occured: '), '\n', `${e}`);
    }
});

module.exports = router;