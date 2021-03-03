export {};
const express = require('express');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


// Router config
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/logout', ensureLoggedIn(), (req: any, res: any) => {
    res.clearCookie('user');
    res.clearCookie('connect.sid');
    res.send();
});

module.exports = router;