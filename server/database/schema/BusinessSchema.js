const mongoose = require('mongoose');
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
 * Generates a single stream key for a Business document
 * 
 * @param {*} length length of the stream key
 * @param {*} cb callback function
 * 
 * @returns {string} stream key
 */
BusinessSchema.methods.generateStreamKey = async function(length=12, cb) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let streamKeyArray = [];
    let streamKey;

    for ( var i = 0; i < length; i++ ) {
        streamKeyArray.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }
    streamKey = streamKeyArray.join("");
    return streamKey;
}

/**
 * Removes a given stream key from the business account
 * 
 * @param {*} streamKey stream key string to remove
 * @param {*} cb callback function
 */
BusinessSchema.methods.deleteStreamKey = async function(streamKey="", cb) {
    // TODO: Find a business with a matching stream key, remove that stream key
    if (this.stream_key.includes(streamKey)) {
        this.stream_key.splice(this.stream_key.indexOf(streamKey), 1);
        this.save(cb);
        return true;
    }
    
    return false;
}

/* Hooks */
BusinessSchema.pre('save', async function(done) {

    // First time configuration
    if (this.isNew) {
        
        // Generate stream keys
        for (let i=0; i<3; i++) {
            this.stream_key.push(this.generateStreamKey());
        }
    }
});

BusinessSchema.post('insertMany', async function(docs, next) {
    docs.forEach(async (doc) => {
        
        // Generate stream keys
        for (let i=0; i<3; i++) {
            doc.stream_key.push(await doc.generateStreamKey());
        }

        await doc.save();
    })
});

module.exports = BusinessSchema;