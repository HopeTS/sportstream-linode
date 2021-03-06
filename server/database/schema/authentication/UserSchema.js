const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const Business = require('../Schema').Business;
const User = require('../Schema').User;


/**
 *  Account schema for athlete accounts
 * 
 * **name:** Name of the user
 * 
 * **email:** Personal email
 * 
 * **password:** Account password
 * 
 * **type:** Account type
 * 
 * **connectedBusinesses:** List of businesses that the user has access to
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'user'
    },
    connectedBusinesses: {
        type: [String],
        default: []
    }
});


/**
 * Connect User to Business
 * 
 * @param {string} business Business document ID
 * @param {*} cb callback function
 * 
 * @returns {Boolean} True if connection successful, else false
 */
UserSchema.methods.connect_business = async function(business=null, cb) {
    try {
        
        // Validation
        if (!business) throw new Error("There is no Business ID");
        if (!mongoose.isValidObjectId(business)) throw new Error(
            "Given business is not a valid ID"
        );
        if (this.connectedBusinesses.includes(business)) throw new Error(
            "Business is already connected to the User"
        );

        // Create connection
        this.connectedBusinesses.push(business);
        await this.save(cb);
        return true;
    }

    catch(e) {
        console.error(e);
        return false;
    }
}

/**
 * Get account information only available to the User
 * 
 * @param {*} cb callback function
 * 
 * @returns {{
 *      name: String,
 *      email: String,
 *      type: String,
 *      connectedBusinesses: Object
 * }}
 */
UserSchema.methods.get_personal_doc = async function(cb) {
    const name = this.name;
    const email = this.email;
    const type = this.type;
    const connectedBusinesses = await this.get_connected_businesses();

    const personalDoc = {
        name: name,
        email: email,
        type: type,
        connectedBusinesses: connectedBusinesses
    };

    return personalDoc;
}

/**
 * Returns all data available to Businesses that this User is connected to
 * 
 * @param {*} cb callback function
 */
UserSchema.methods.get_business_doc = async function(cb) {
    const businessDoc = {
        name: this.name,
        email: this.email,
        type: this.type
    }

    return businessDoc;
}


/**
 *  Get Business documents of all businesses connected to User. (Only return
 *  the Business' public data.)
 * 
 *  @param {*} cb
 * 
 *  @returns {object} [{
 *      field: Business name
 *      type: Business type
 *      streams: Current streams
 * }]
 */
UserSchema.methods.get_connected_businesses = async function(cb) {
    
    // For each business in connected businesses, get the raw business document
    const businesses = await Promise.all(this.connectedBusinesses.map(
        async function(business) {
            return await mongoose.models['Business'].findOne(
                {_id: business},
                async function(err, doc) {
                    if (err) throw err;
                    if (doc) return await doc;
                    return null;
                }
            );
        }
    ));

    // Get the user_doc for each connected business
    const userDocs = await Promise.all(businesses.map(
        async function(business) {
            return await business.get_user_doc();
        }
    ));

    console.log('user getconnectedbusinesses userdocs', userDocs)

    return userDocs;
}


/**
 * Handles password change
 * 
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if successful, else false
 */
UserSchema.methods.change_password = async function(password="", cb) {
    try {
        // Validation
        if (!password) throw new Error('No password given');

        const hashedPassword = await bcrypt.hash(password, 10);
        this.password = hashedPassword;
        await this.save(cb);
        return true;
    }

    catch(e) {
        console.error(e);
        return false;
    }
}


UserSchema.pre('save', async function(next) {
    // First time setup
    if (this.isNew) {
        
        // Encrypt password
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }

    next();
});


/** Handle User Account deletion */
UserSchema.pre('remove', async function(cb) {
    // TODO: Delete Connection Passwords
    // TODO: Delete User from ConnectedUsers in Businesses
    
});


module.exports = UserSchema;