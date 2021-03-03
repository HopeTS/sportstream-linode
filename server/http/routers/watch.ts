export {};
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const publicPath = path.join(__dirname, '../../../public/');
const appRoute = path.join(publicPath, 'index.html');


// Router config
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

/**
 * Get stream information available to a User
 * (Endpoint for Stream.get_user_doc())
 */
router.get('/watch/*', ensureLoggedIn(), async (req: any, res: any) => {
    try {
        return res.sendFile(appRoute);
    }

    catch(e) {
        console.error(e);
        return res.status(500).send();
    }
});

module.exports = router;