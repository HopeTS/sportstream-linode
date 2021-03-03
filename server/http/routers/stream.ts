export {};
const express = require('express');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const stream = require('stream');


// Router config
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

/**
 * Get stream information available to a User
 * (Endpoint for Stream.get_user_doc())
 */
router.get('/stream/get-user-doc', ensureLoggedIn(), 
    async (req: any, res: any) => {
        try {
            console.log('streams/get-user-doc req.data', req.data);
            return res.status(200).send();
        }

        catch(e) {
            console.error(e);
            return res.status(500).send();
        }
    }
);

router.get('stream/get-flv/:key', ensureLoggedIn(), 
    async (req: any, res: any) => {
        try {
            if (!req.params.key) return res.status(400).send();

            const httpsInternalStreamUrl = `https://localhost:8443/live/${req.params.key}.flv`;
            //stream(httpsInternalStreamUrl).pipe(res);
            res.send(stream.pipe(httpsInternalStreamUrl));
        }

        catch(e) {
            console.error(e);
            return res.status(500).send();
        }
    }
);

module.exports = router;