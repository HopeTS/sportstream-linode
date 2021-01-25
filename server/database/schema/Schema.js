/* Master schema file */

const mongoose = require('mongoose');


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


/**
 *  Account schema for athlete accounts
 * 
 * **name:** Name of the user
 * 
 * **email:** Personal email
 * 
 * **password:** Account password
 * 
 * **type:** Account type
 * 
 * **connected_businesses:** List of businesses that the user has access to
 */
exports.User = mongoose.model('User', require('./UserSchema'));


/**
 * Account schema for business accounts
 * 
 * **name:** Name of the Business
 * 
 * **email:** Business email
 * 
 * **password:** Account password
 * 
 * **type:** Account type
 * 
 * **streams:** Business streams
 *      **upcoming:** Future streams
 *      **current:** Current streams
 *      **previous:** Previous streams
 * 
 * **connection_ids:** Unused connection ids
 * 
 * **connected_users:** List of connected User accounts
 */
exports.Business = mongoose.model('Business', require('./BusinessSchema'));