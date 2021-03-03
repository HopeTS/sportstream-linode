const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

const {
    User, Business
} = require('../../database/schema/Schema');


/** Passport strategies */
module.exports = function(passport: any) {

    // User account login strategy
    passport.use('userLogin',
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, (username: string, password: string, done: Function) => {

            // Query for matching account in User collection
            User.findOne(
                {email: username}, 
                (err: Error, user: any) => {
                    if (err) throw err;
                    if (!user) return done(null, false);

                    bcrypt.compare(
                        password, user.password, 
                        (err: Error, result: any) => {
                            if (err) throw err;
                            if (result === true) return done(null, user);
                            else return done(null, false);
                        }
                    );
                }
            );
        })
    );

    // Business account login strategy
    passport.use('businessLogin',
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, (username: string, password: string, done: Function) => {
            
            // Query for matching account in Business collection
            Business.findOne(
                {email: username}, 
                (err: Error, user: any) => {
                    if (err) throw err;
                    if (!user) return done(null, false);

                    bcrypt.compare(
                        password, user.password, 
                        (err: Error, result: any) => {
                            if (err) throw err;
                            if (result === true) return done(null, user);
                            else return done(null, false);
                        }
                    );
                }
            );
        })
    );

    // Serialization
    passport.serializeUser((user: any, cb: Function) => {
        cb(null, user.id);
    });

    // Deserialization
    passport.deserializeUser(function(user: any, done: Function) {
        if (user != null) done(null, user);
    });
}