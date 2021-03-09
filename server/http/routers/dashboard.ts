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


router.get('/dashboard', ensureLoggedIn(), (req: any, res: any) => {
    res.sendFile(appRoute);
});


export = router;