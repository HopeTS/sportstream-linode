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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    connected_businesses: [String]
});


/**
 * Connect user to a business with a matching connection_id
 * 
 * @param {string} business_password the password to connection to a business
 *      with a matching business' connection_id
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if connected to business, false if not
 */
UserSchema.methods.connect_business = async function(password=null, cb) {
    if (!password) return false;

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
    
    return true;
}


/**
 *  Get Business documents of all businesses connected to User. (Only return
 *  the Business' public data.)
 * 
 *  @param {*} cb
 * 
 *  @returns [{
 *      name: Business name
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
                    if (doc) return doc.getUserDoc();
                    return null;
                }
            );
        }
    ));

    // Get the userDocs
    const userDocs = await Promise.all(businesses.map(
        async function(business) {
            return await business.get_user_doc();
        }
    ));

    return userDocs;
}


/* Hooks */
UserSchema.pre('save', async function(done) {
    if (this.isNew) {
        if (this.connected_businesses = undefined) {
            this.connected_businesses = [];
        }
        this.type = 'user';
    }
});

UserSchema.post('insertMany', async function(docs, next) {
    docs.forEach((doc) => {
        // TODO: connect to business if applicable
    });
});

UserSchema.post('insert', (err, next) => {
    // TODO: connect to business if applicable
});

module.exports = UserSchema;