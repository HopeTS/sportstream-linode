const chalk = require('chalk');
const passport = require('passport');
const config = require('../config/default');
const { User, Business } = require('../database/schema/Schema');

/** 
 * Connects a User to a Business, giving the User access to the Business streams
 * 
 * @param {string} business_password The key the User account must match to a 
 *      business account
 */
export const connectUserToBusiness = (business_password) => {
    // TODO: Find a business with a connection_id that matches the business password
    Business.findOne({connection_id: business_password});
}

