const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chalk = require('chalk');

const generate_key = require('../../../utils/generate_key');


/**
 * Connection Password schema (For connecting User to Business)
 */
const ConnectionPasswordSchema = new Schema({
    business: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
    password: {
        type: String
    },
    given: {
        type: Boolean,
        default: false
    },
    used: {
        type: Boolean,
        default: false
    }
});


/**
 * Getter method for given attribute
 * 
 * @param {*} cb callback function
 */
ConnectionPasswordSchema.methods.is_given = async function(cb) {
    return ConnectionPasswordSchema.given;
}


/**
 * Getter method for used attribute
 * 
 * @param {*} cb callback function
 */
ConnectionPasswordSchema.methods.is_used = async function(cb) {
    return ConnectionPasswordSchema.used;
}


/**
 * Give out connection password
 * 
 * @param {*} cb  callback function
 * 
 * @returns {Boolean} whether give was successful
 */
ConnectionPasswordSchema.methods.give = async function(cb) {
    try {
        if (this.given) throw new Error('Connection Password already given');
        this.given = true;
        await this.save(cb);
        return true;
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


/**
 * Use connection password
 * 
 * @param {*} cb callback function
 * @param {String | false} userID mongoose._id of connected User
 * 
 * @returns {Boolean} whether use was successful
 */
ConnectionPasswordSchema.methods.use = async function(userID = false, cb) {
    try {

        // Validation
        if (this.used) throw new Error('Connection Password already used');
        if (!userID) throw new Error('There is no user ID');

        // Get Business doc
        const business = await mongoose.models['Business'].findById(
            this.business, 
            (err, doc) => {
                if (err) return false;
                if (!doc) return false;
                return doc;
            }
        );
        if (!business) throw new Error('Business not found');

        // Get User doc
        const user = await mongoose.models['User'].findById(
            userID,
            (err, doc) => {
                if (err) return false;
                if (!doc) return false;
                return doc;
            }
        );
        if (!user) throw new Error('User not found');

        // Establish Business connection
        const businessConnection = await business.connect_user(userID);
        if (!businessConnection) throw new Error(
            "Couldn't establish Business connection"
        );
        
        // Establish User connection
        const userConnection = await user.connect_business(this.business);
        if (!userConnection) throw new Error(
            "Couldn't establish User connection"
        );

        // Update connection password
        this.given = true;
        this.used = true;
        await this.save(cb);
        return true;
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


ConnectionPasswordSchema.pre('save', async function(next) {

    // First time configuration
    if (this.isNew) {

        // Generate unique password
        let unique = false;
        const passwordLength = Math.floor(Math.random() * 4) + 8;
        let connectionPassword;

        while (!unique) {
            try {
                connectionPassword = generate_key(passwordLength);

                // Ensure password is unique
                await mongoose.models['ConnectionPassword'].findOne(
                    {password: connectionPassword},
                    async function(err, doc) {
                        if (err) throw err;
                        if (!user) unique = true;
                    }
                );
            }

            catch(e) {
                console.error(e);
            }
        }

        console.log(chalk.blue(
            `[connectionPassword] password generated: ${connectionPassword}`
        ));

        this.password = connectionPassword;
    }

    next();
})

module.exports = ConnectionPasswordSchema;