//import passport, { PassportStatic } from "passport";

namespace Castamatch {
/*
 *  Master Passportjs configuration file
 */


/* External packages */
//import 'bcryptjs';
//const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;


/* Internal packages */
const User = require("../database/schema/Schema").User;


/* Local strategy */
export function(passport: any) {
    passport.use(

        new localStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, (
            username: string, 
            password: string, 
            done: any
        ) => {
            User.findOne({ email: username }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);

                bcrypt.compare(password, user.password, (err, result) => {
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

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            const userInformation = {
                email: user.email,
            };
            cb(err, userInformation);
        });
    });
};

/* EOF */
}