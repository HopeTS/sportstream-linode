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
    console.log('Here is this!', this._id)
    const user_id = this._id
    let newConnections = this.connected_businesses || [];

    // Find business (if exists)
    await mongoose.models['Business'].findOne({connection_id: password}, 
        async function(err, user) {
            if (err) throw err;
            if (!user) return false;

            // If business found
            console.log(user._id)
            newConnections.push(user._id);
            console.log('new connections', newConnections)
        }
    );

    mongoose.models['User'].findOne({_id: user_id}, async function (err, doc) {
        doc.connected_businesses = newConnections;
        console.log('Here are new connections', doc.connected_businesses)
        doc.markModified('connected_businesses')
        await doc.save(function(err, news) {
            if (err) throw err;
            if (news) console.log(news)
        });
    })

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
    console.log('User insert pre hook', next)
    // TODO: connect to business if applicable
});

module.exports = UserSchema;