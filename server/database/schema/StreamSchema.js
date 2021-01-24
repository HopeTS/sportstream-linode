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
        required: true
    }
});

/**
 * Sets stream status to current
 * 
 * @param {*} cb callback function
 */
StreamSchema.methods.startStream = async function(cb) {
    this.status = 'current';
    return await this.save(cb);
}

/**
 * Sets stream status to previous
 * 
 * @param {*} cb callback function
 */
StreamSchema.methods.endStream = async function(cb) {
    this.status = 'previous';
    return await this.save(cb);
}

module.exports = StreamSchema;