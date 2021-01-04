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
 * __stream_keys:__ Keys to establish an RTMP stream through OBS
 * 
 * __connection_id:__ String that user accounts need to enter to gain access
 * to the company streams
 */
const BusinessSchema = new Schema({
    name: String,
    email: String,
    password: String,
    stream_keys: Array,
    connection_id: String,
    type: String
});