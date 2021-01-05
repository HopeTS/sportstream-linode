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

module.exports = BusinessSchema;