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
 * @returns {string | false} stream key
 */
BusinessSchema.methods.generateStreamKey = async function(length=12, cb) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let streamKeyArray = [];
    let streamKey;

    // Generate the key
    for ( var i = 0; i < length; i++ ) {
        streamKeyArray.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }
    streamKey = streamKeyArray.join("");
    this.stream_key.push(streamKey);

    // Store the key
    try {
        this.save(cb);
        return streamKey;    
    } 
    
    catch(e) {
        console.error(e);
        return false;
    }
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
        await this.save();
        return true;
    }
    return false;
}

BusinessSchema.methods.generateConnectionId = async function(length=12, cb) {
    // Generate the connection id
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let connectionIdArray = [];
    let connectionId;

    for ( var i = 0; i < length; i++ ) {
        connectionIdArray.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }

    connectionId = connectionIdArray.join("");
    console.log('(instance method) connection id before:', this.connection_id);
    this.connection_id = connectionId;
    console.log('(instance method) after', this.connection_id);
    await this.save();

    return false;    
}


/* Hooks */
BusinessSchema.pre('save', async function(done) {
    // First time configuration
    if (this.isNew) {
        this.stream_key = ['erererer']
    }
});

BusinessSchema.post('insertMany', function(docs, next) {
    docs.forEach((doc) => {
        doc.generateConnectionId().then((res) => {

        }).catch((e) => {
            console.log(e)
        })

        // Generate stream keys
        for (let i=0; i<3; i++) {
            doc.generateStreamKey().then((res) => {

            }).catch((e) => {
                console.log(e);
            })
        }
    })
});

BusinessSchema.post('validate', async function(doc, next) {
    console.log('POST VALIDATE');
    if (this.isNew) {
        console.log('new POST VALIDATE')
        await this.generateConnectionId();
        
        // Businesses start with 3 stream keys
        for (let i=0; i<3; i++) {
            await this.generateStreamKey();
        }        
    }
});

BusinessSchema.pre('create', async function(doc, next) {
    console.log('PRE CREATE');
})

BusinessSchema.post('create', async function(doc, next) {
    console.log('POST CREATE');
});

module.exports = BusinessSchema;