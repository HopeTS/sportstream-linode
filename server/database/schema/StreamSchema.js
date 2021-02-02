const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Business } = require('./Schema');


/**
 * Schema for stream objects
 * 
 * **field:** Field name
 * 
 * **business:** Associated Business (id)
 * 
 * **key:** Stream key
 * 
 * **status:** Upcoming stream, current stream or previous stream
 */
const StreamSchema = new Schema({
    field: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'current', 'previous'],
        default: 'upcoming'
    },
    key: {
        type: String,
        default: ''
    }
});

/**
 * Generate stream key
 * 
 * @param {*} cb callback function
 */
StreamSchema.methods.generate_key = async function(cb) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let unique = false;   // Whether or not streamKey is shared by other businesses
    let streamKeyArray = [];
    let streamKey;

    while (!unique) {
        // Generate the key
        for ( var i = 0; i < 12; i++ ) {
            streamKeyArray.push(
                characters.charAt(Math.floor(Math.random() * characters.length))
            );
        }
        streamKey = streamKeyArray.join('');

        // Ensure key is unique
        await mongoose.models['Stream'].findOne({key: {"$in": [streamKey]}}, function(err, user) {
            if (err) throw err;
            if (!user) unique = true;
        });    
    }

    console.log('[stream] created new stream key', streamKey);
    return streamKey;
}

/**
 * 
 * @param {*} cb  callback function
 */
StreamSchema.methods.get_user_doc = async function(cb) {
    const doc = {
        field: this.field,
        key: this.key
    }

    return doc;
};

/**
 * Sets stream status to current
 * 
 * @param {*} cb callback function
 */
StreamSchema.methods.start_stream = async function(cb) {
    this.status = 'current';
    return await this.save(cb);
}

/**
 * Sets stream status to previous
 * 
 * @param {*} cb callback function
 */
StreamSchema.methods.end_stream = async function(cb) {
    this.status = 'previous';
    return await this.save(cb);
}

module.exports = StreamSchema;