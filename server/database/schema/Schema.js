/* Master schema file */

const mongoose = require('mongoose');

/**
 *  Account schema for athlete accounts
 * 
 * **name:** Name of the user
 * 
 * **email:** Personal email
 * 
 * **password:** User's password
 * 
 * **connected_businesses:** List of businesses that the user has access to
 */
exports.User = mongoose.model('User', require('./UserSchema'));

/**
 * Account schema for businesses
 * 
 * **name:** Name of the company
 * 
 * **email:** Business email
 * 
 * **password:** Account password
 * 
 * **stream_key:** Keys to establish an RTMP stream through OBS
 * 
 * **connection_id:** String that user accounts need to enter to gain access
 * to the company streams
 */
exports.Business = mongoose.model('Business', require('./BusinessSchema'));

/**
 * Schema for stream objects
 * 
 * **field:** Field name
 * 
 * **business:** Associated Business (id)
 * 
 * **status:** Upcoming stream, current stream or previous stream
 */
exports.Stream = mongoose.model('Stream', require('./StreamSchema'));