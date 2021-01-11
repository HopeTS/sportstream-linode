/* Master schema file, wires up all document schema */

const mongoose = require('mongoose');

/**
 *  Account schema for athlete accounts
 * 
 * __name:__ Name of the user
 * 
 * __email:__ Personal email
 * 
 * __password:__ User's password
 * 
 * __connected_businesses:__ List of businesses that the user has access to
 */
exports.User = mongoose.model('User', require('./UserSchema'));

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
exports.Business = mongoose.model('Business', require('./BusinessSchema'));