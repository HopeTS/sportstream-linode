const express = require('express');
const path = require('path');
const chalk = require('chalk');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const http2https = require('../middleware/http2https');
const publicPath = path.join(__dirname, '../../public/');
const appRoute = path.join(publicPath, 'index.html');
const wildcardRoute = path.join(publicPath, '404.html');
const User = require('../database/schema/Schema').User;

const router = express.Router();

router.get('/login', (req, res) => {
    try {
        return res.sendFile(appRoute);
    
    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) {
            return res.status(401).send("that user does not exist");
        } else {
            req.logIn(user, (err) => {
                if (err) throw err;
                return res.send(user.name);
            });
        }
    })(req, res, next);
});

router.get('/register', (req, res) => {
    try {
        return res.sendFile(appRoute);
    
    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});

router.post('/register',
    (req, res) => {
        try {
            console.log(`Received a${req.secure ? " secure": "n insecure"} /register request`);
            User.findOne({name: req.body.name}, async (err, doc) => {
                if (err) throw err;
                if (doc) res.send("User already exists!");
                if (!doc) {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    console.log(hashedPassword)
                    const newUser = new User({
                        name: req.body.name,
                        username: req.body.email,
                        email: req.body.email,
                        type: req.body.type,
                        password: hashedPassword,
                    });
                    await newUser.save();
                    console.log(newUser)
                }
            })
        } catch(e) {
            res.send();
            console.log(
                chalk.red('An error occured: '),
                '\n',
                `${e}`
            );
        }
    }
);


module.exports = router;