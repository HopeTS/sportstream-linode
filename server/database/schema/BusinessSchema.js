const mongoose = require('mongoose');
const { Business } = require('./Schema');
const Schema = mongoose.Schema;

/**
 * Account schema for businesses
 * 
 * __name:__ Name of the company
 * 
 * __email:__ Business email
 * 
 * __password:__ Account password
 * 
 * **stream_key:** Keys to establish an RTMP stream through OBS
 * 
 * **connection_id:** String that user accounts need to enter to gain access
 * to the company streams
 */
const BusinessSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    stream_key: Array,
    connection_id: String,
    type: String
});

/**
 * Generates a single unique stream key for a Business document
 * 
 * @param {*} length length of the stream key
 * @param {*} cb callback function
 * 
 * @returns {string | false} stream key
 */
BusinessSchema.methods.generateStreamKey = async function(length=12, cb) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let unique = false;   // Whether or not streamKey is shared by other businesses
    let streamKeyArray = [];
    let streamKey;

    // Generate the key
    while (!unique) {
        for ( var i = 0; i < length; i++ ) {
            streamKeyArray.push(
                characters.charAt(Math.floor(Math.random() * characters.length))
            );
        }
        streamKey = streamKeyArray.join('');

        // Ensure key is unique
        await mongoose.models['Business'].findOne({stream_key: {"$in": [streamKey]}}, function(err, user) {
            if (err) throw err;
            if (!user) unique = true;
        });    
    }

    // Add key to stream_key
    this.stream_key.push(streamKey);
    return streamKey;
}

/**
 * Returns public docs (information available to anyone)
 * 
 * @param {*} cb callback function 
 */
BusinessSchema.methods.getPublicDoc = async function(cb) {
    const publicDoc = await {
        name: this.name
    }

    return publicDoc;
}

/**
 * Returns docs for connected user (only available to connected users)
 * 
 * @param {*} cb callback function 
 */
BusinessSchema.methods.getUserDoc = async function(cb) {
    const userDoc = await {
        name: this.name,
        email: this.email,
        stream_key: this.stream_key
    }

    return userDoc;
}

/**
 * Removes a given stream key from the business account
 * 
 * @param {*} streamKey stream key string to remove
 * @param {*} cb callback function
 * 
 * @returns {boolean} true if deleted, else false
 */
BusinessSchema.methods.deleteStreamKey = async function(streamKey="", cb) {
    if (this.stream_key.includes(streamKey)) {
        this.stream_key.splice(this.stream_key.indexOf(streamKey), 1);
        return true;
    }
    return false;
}

/**
 * Generates a unique connection ID for a Business account
 * 
 * @param {*} length length of the id
 * @param {*} cb callback function
 * 
 * @returns {string} connection ID
 */
BusinessSchema.methods.generateConnectionId = async function(length=12, cb) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let unique = false;
    let connectionIdArray = [];
    let connectionId;
    let newDoc = false; // Flag to determine if save should be called

    // Generate connection ID
    while (!unique) {
        for ( var i = 0; i < length; i++ ) {
            connectionIdArray.push(
                characters.charAt(Math.floor(Math.random() * characters.length))
            );
        }    
        connectionId = connectionIdArray.join('');

        // Ensure ID is unique
        await mongoose.models['Business'].findOne({connection_id: connectionId}, function(err, user) {
            if (err) throw err;
            if (!user) unique = true;
        })
    }

    // Add connection ID
    this.connection_id = connectionId;
    return this.connection_id;
}

/* Hooks */
BusinessSchema.pre('save', async function(done) {
    if (this.isNew) {
        this.connection_id = this.generateConnectionId();

        // Businesses start with 3 stream keys
        for (let i=0; i<3; i++) {
            await this.generateStreamKey();
        } 
        return done();    
    }

});

module.exports = BusinessSchema;