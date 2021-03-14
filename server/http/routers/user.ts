const express = require('express');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const User = require('../../database/schema/Schema').User;
const ConnectionPassword = require('../../database/schema/Schema').ConnectionPassword;


// Router config
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


/**
 * Get all information available to user account 
 * (Endpoint for User.get_personal_doc instance method)
 * 
 * @returns {{
 *      name: string
 *      email: string
 *      connected businesses
 * }} 
 * 
 */
router.get('/user/get-personal-doc', ensureLoggedIn(), 
    async (req: any, res: any) => {
        try {

            // Find User account
            const user = await User.findOne(
                {_id: req.user},
                async (err: any, doc: any) => {
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
    }
);


/**
 * Get all information available to the business connected to User
 * (Endpoint for User.get_business_doc instance method)
 */
router.get('/user/get-business-doc', ensureLoggedIn(), 
    async (req: any, res: any) => {
        try {

            // Find User account
            const user = await User.findOne(
                {_id: req.user},
                async (err: any, doc: any) => {
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
    }
);


/**
 * Get information about all Businesses connected to the User
 * (Endpoint for User.get_connected_businesses instance method)
 */
router.get('/user/get-connected-businesses', ensureLoggedIn(), 
    async (req: any, res: any) => {
        try {

            // Find User account
            const user = await User.findOne(
                {_id: req.user},
                async (err: any, doc: any) => {
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
    }
);


/**
 * Endpoint for connecting User and Business with ConnectionPassword
 */
router.post('/user/connect-business', ensureLoggedIn(), 
    async (req: any, res: any) => {
        try {

            const password = req.body.connectionPassword;
            
            // Find User account
            const user = await User.findOne(
                {_id: req.user},
                async (err: any, doc: any) => {
                    if (err) throw err;
                    if (doc) return doc;
                    return false;
                }
            );
            if (!user) return res.status(403).send();

            // Validate connection password
            const connectionPassword = await ConnectionPassword.findOne(
                {password: password},
                async (err: any, doc: any) => {
                    if (err) throw err;
                    if (!doc) return false;
                    return doc;
                }
            )
            if (!connectionPassword) return res.status(404).send();
            if (connectionPassword.used) return res.status(423).send();

            // Establish connection
            const connection = await connectionPassword.use(req.user);
            if (!connection) return res.status(500).send();

            return res.status(201).send();
        }

        catch (e) {
            return res.status(500).send();
        }
    }
);

export = router;