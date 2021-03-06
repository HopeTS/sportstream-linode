const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chalk = require('chalk');

const generate_key = require('../../../utils/generate_key');
const { Business } = require('../Schema');


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
 * 
 * @param {*} cb  callback function
 */
StreamSchema.methods.get_user_doc = async function(cb) {
    console.log('streamschema get userdoc')
    const doc = {
        field: this.field,
        key: this.key
    }
    console.log('streamschema returning', doc)
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


StreamSchema.pre('save', async function(next) {

    // First time configuration
    if (this.isNew) {

        // Generate unique key
        let unique = false;
        const keyLength = Math.floor(Math.random() * 4) + 8;
        let streamKey;

        while (!unique) {
            try {
                streamKey = generate_key(keyLength);

                // Ensure key is unique
                await mongoose.models['Stream'].findOne(
                    {key: streamKey},
                    async function(err, stream) {
                        if (err) throw err;
                        if  (!stream) unique = true;
                    }
                );
            }

            catch(e) {
                console.error(e);
            }
        }
        
        this.key = streamKey;
    }

    next();
});


module.exports = StreamSchema;