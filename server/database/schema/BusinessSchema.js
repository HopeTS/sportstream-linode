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
 * @param {*} cb callback function
 * @param {*} length length of the stream key
 * 
 * @returns {string} stream key
 */
BusinessSchema.methods.generateStreamKey = async function(cb, length=12) {
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

BusinessSchema.methods.removeStreamKey = async function(cb, streamKey="") {
    console.log('Geti')
    // TODO: Find a business with a matching stream key, remove that stream key
    Business.find({stream_key: streamKey}, async function(err, doc) {
        if (err) throw err;
        if (!doc) console.log('No matching business')
        
        if (doc) {
            console.log('Business found, the keys are', doc.stream_key);
            const keyIndex = doc.stream_key.indexOf(streamKey);
            console.log('Index of the key', keyIndex);
            if (keyIndex > 1) doc.stream_key.splice(keyIndex, 1);
            console.log('New doc', doc)
            await doc.save();
            return true
        } else {
            console.log('Doc not found')
            return false
        }
    });
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