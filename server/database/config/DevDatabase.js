const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const path = require('path');

const User = require('../schema/Schema').User;
const Business = require('../schema/Schema').Business;
const Stream = require('../schema/Schema').Stream;
const ConnectionPassword = require('../schema/Schema').ConnectionPassword;


/**
 * Object for handling the dev database config
 */
class DevDatabase {
    constructor() {
        // Initialize MongoD
        this.mongod = new MongoD({
            dbpath: path.join(__dirname, '..', 'db'),
            port: '27018',
            dbname: 'castamatchdev'
        });

        // Test users
        this.userData = [{
            name: 'Test1',
            email: 'user@gmail.com',
            password: await bcrypt.hash('1234567890', 10)
        }, {
            name: 'Test2',
            email: 'user2@gmail.com',
            password: await bcrypt.hash('1234567890', 10)
        }, {
            name: 'Test3',
            email: 'user3@gmail.com',
            password: await bcrypt.hash('1234567890', 10)
        }];

        // Test businesses
        this.businessData = [{
            name: 'Test business 1',
            email: 'business@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
        }, {
            name: 'Test business 2',
            email: 'business2@gmail.com',
            password: await bcrypt.hash('1234567890', 10),
        }];

        // Collections
        let users;
        let businesses;
        let streams;
        let connectionPasswords;
    }

    /** Establish MongoDB connection */
    connect() {
        this.mongod = new MongoD(this.config);
    }

    /** Insert documents */
    populate() {

    }

    /** Refreshes class attributes */
    refresh() {
        // TODO: Update Users
        // TODO: Update Businesses
        // TODO: Update Streams
        // TODO: Update ConnectionPasswords
    }

    /** Clears database */
    async clear() {
        try {
            // Clear users
            await User.find({}, (err, docs) => {
                docs.forEach((doc) => {
                    const id = doc._id;
                    User.findByIdAndDelete(id, (err) => {
                        if (err) throw err;
                    });
                });
            });

            // Clear businesses
            await Business.find({}, (err, docs) => {
                docs.forEach((doc) => {
                    const id = doc._id;
                    Business.findByIdAndDelete(id, (err) => {

                    });
                });
            });
        }

        catch(e) {
            console.error(e);
        }
    }
}

module.exports = DevDatabase;