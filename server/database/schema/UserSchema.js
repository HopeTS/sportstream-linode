const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Business = require('./Schema').Business;
const User = require('./Schema').User;


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
 * **connected_businesses:** List of businesses that the user has access to
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
    connected_businesses: {
        type: [String],
        default: []
    }
});


/**
 * Connect user to a business with a matching connection_id
 * 
 * @param {string} business_password the password to connection to a business
 *      with a matching business' connection_id
 * @param {*} cb callback function
 * 
 * @returns {object | false} user if connected to business, false if not
 */
UserSchema.methods.connect_business = async function(password=null, cb) {
    // Error handling
    if (!password) return false;

    // Only connect if Business exists
    const business = await mongoose.models['Business'].findOne(
        {connection_ids: {"$in": [password]}},
        async function(err, doc) {
            if (err) throw err;
            if (doc) return doc;
            return false;
        }
    );
    if (!business) return false;


    // Connect business to user
    this.connected_businesses.push(business._id);
    await this.save(cb);
    await business.connect_user(this._id);
    
    return this;
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
 *      connected_businesses: Object
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
        connected_businesses: connectedBusinesses
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
    const businesses = await Promise.all(this.connected_businesses.map(
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
    console.log('userschema userdocs', userDocs)
    return userDocs;
}

module.exports = UserSchema;