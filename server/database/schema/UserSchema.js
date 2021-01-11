const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Business = require('./Schema').Business;

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
 * 
 * @param {*} cb callback function
 * 
 * @param {string} business_password the password to connection to a business
 *      with a matching business' connection_id
 */
UserSchema.methods.connectToBusiness = (cb, business_password) => {
    console.log('Called the custom function');
    // TODO
}

/* Hooks */
UserSchema.pre('save', async function(done) {
    console.log('user save hook', this._id)
});

UserSchema.post('insertMany', async function(docs, next) {
    console.log('insert many user hook')
    docs.forEach((doc) => {
        console.log(doc._id)
        // TODO: connect to business if applicable
    });
});

UserSchema.post('insert', (err, next) => {
    console.log('User insert pre hook', next)
    // TODO: connect to business if applicable
});

module.exports = UserSchema;