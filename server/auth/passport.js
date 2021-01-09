/*
 *  Master Passportjs configuration file
 */

const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

const User = require("../database/schema/Schema").User;
const Business = require("../database/schema/Schema").Business;


/**
 *  Passport strategies
 */
module.exports = function(passport) {

    /* Login strategy for User accounts */
    passport.use('userLogin',
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, (username, password, done) => {

            // Query for matching account in User collection
            User.findOne({email: username}, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) return done(null, user);
                    else return done(null, false);
                });
            });
        })
    );

    passport.use('businessLogin',
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, (username, password, done) => {
            
            // Query for matching account in Business collection
            Business.findOne({email: username}, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) return done(null, user);
                    else return done(null, false);
                });
            });
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        if(user!=null) done(null,user);
    });
};
