const User = require('../database/schema/User').User;
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, uesr.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            });
        })
    );
}