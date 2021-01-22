const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Business = require('./Schema').Business;
const User = require('./Schema').User;

/**
 *  Account schema for athlete accounts
 * 
 * __name:__ Name of the user
 * 
 * __email:__ Personal email
 * 
 * __password:__ User's password
 * 
 * **connected_businesses:** List of businesses that the user has access to
 */
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    connected_businesses: Array,
});

/**
 * Connect to user to a business with a matching connection_id
 * 
 * @param {string} business_password the password to connection to a business
 *      with a matching business' connection_id
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if connected to business, false if not
 */
UserSchema.methods.connectToBusiness = async function(password="", cb) {
    let newConnections = this.connected_businesses || [];
    const user_id = this._id
    let newDoc = false; // Flag to determine if save should be called

    // Find business (if exists)
    await mongoose.models['Business'].findOne({connection_id: password}, 
        async function(err, user) {
            if (err) throw err;
            if (!user) return false;

            // If business found
            newConnections.push(user._id);
        }
    );


    mongoose.models['User'].findOne({_id: user_id}, async function (err, doc) {
        if (err) throw err;

        // If User is not new
        if (doc) {
            doc.connected_businesses = newConnections;
            doc.markModified('connected_businesses');
            await doc.save(function(err, news) {
                if (err) throw err;
            });
        }

        // If user is new
        else {
            newDoc = true;       
        }
    });

    if (newDoc) {
        this.connected_businesses = newConnections;
    }

    return newConnections;
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
UserSchema.methods.getConnectedBusinesses = async function(cb) {
    
    // For each business in connected businesses, get the raw business document
    const businesses = await Promise.all(this.connected_businesses.map(
        async function(business) {
            return await mongoose.models['Business'].findOne(
                {_id: business},
                async function(err, doc) {
                    if (err) throw err;
                    if (doc) return await doc.getUserDoc();
                    return null;
                }
            );
        }
    ));
        
    console.log('Here are the connected businesses:', businesses);

    return true;
}

/**
 * 
 * @param {*} cb 
 */
UserSchema.methods.getAvailableStreams = async function(cb) {
    //TODO
    return;
}

/* Hooks */
UserSchema.pre('save', async function(done) {
    if (this.isNew) {
        this.connected_businesses = [];
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