const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const mongoose = require('mongoose');
const MongoD = require('../mongod');

const User = require('../schema/Schema').User;
const Business = require('../schema/Schema').Business;
const Stream = require('../schema/Schema').Stream;


/**
 * Object for handling production database config
 */
class ProdDatabase {
    constructor() {

    }

    /** Establish MongoDB connection */
    connect() {

    }
}