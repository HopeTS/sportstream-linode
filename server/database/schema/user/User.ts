const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
 * **connectedBusinesses:** List of businesses that the user has access to
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'user'
    },
    connectedBusinesses: {
        type: [String],
        default: []
    }
});


export = UserSchema;