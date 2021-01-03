const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    connected_businesses: Array,
});

module.exports = UserSchema;