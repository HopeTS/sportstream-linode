export {};
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const publicPath = path.join(__dirname, '../../public/');


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