const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bodyParser = require('body-parser');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const publicPath = path.join(__dirname, '../../../public/');
const appRoute = path.join(publicPath, 'index.html');

// Router config
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/login', (req: any, res: any) => {
    try {
        return res.sendFile(appRoute);
    }

    catch(e) {
        res.status(500).send();
        console.log(chalk.red('An error occured:\n'), e);
    }
});


router.post('/login/user', (req: any, res: any, next: any) => {
    try {
        passport.authenticate('userLogin', (err: any, user: any, info: any) => {
            if (err) throw err;
            if (!user) res.status(404).send();
    
            else {
                console.log('logging user in');
                
                req.login(user, (err: any) => {
                    if (err) throw err;
                    res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                    res.status(202).send(user);
                });
            }
        })(req, res, next);
    }

    catch(error) {
        return res.status(500).send();
    }
});


router.post('/login/business', (req: any, res: any, next: any) => {
    try {
        passport.authenticate('businessLogin', (err: any, user: any, info: any) => {
            if (err) throw err;
            if (!user) res.status(404).send();
    
            else {
                req.logIn(user, (err: any) => {
                    if (err) throw err;
                    res.cookie('user', user.id, {maxAge: 2592000000}); // 1 Month
                    res.status(202).send(user);
                });
            }
        })(req, res, next);
    }

    catch(error) {
        return res.status(500).send();
    }
});


router.get('/login/status', ensureLoggedIn(), (req: any, res: any) => {
    res.status(210).send();
});


export = router;