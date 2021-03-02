export {}
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

const MongoD = require('./mongod');

/* const User = require('../schema/Schema.js').User;
const Business = require('../schema/Schema.js').Business;
const Stream = require('../schema/Schema.js').Stream;
const ConnectionPassword = require('../schema/Schema.js').ConnectionPassword; */


class DevDatabase {
    constructor(
        protected mongod: any,
        protected dbname: string,
        protected dbport: number,
        protected dbpath: string,
        
        protected userData: {
            name: string,
            email: string,
            password: string
        }[],
        protected businessData: {
            name: string,
            email: string,
            password: string
        }[],

        protected users: any[],
        protected businesses: any[],
        protected streams: any[],
        protected connectionPasswords: any[],
        protected db: any
    ) {
        // Initialize MongoDB
        this.mongod = new MongoD({
            dbpath: path.join(__dirname, '..', 'db'),
            port: '27018',
            dbname: 'castamatchdev'
        });

        // Test users
        this.userData = [{
            name: 'Test1',
            email: 'user@gmail.com',
            password: bcrypt.hash('1234567890', 10).then((key: string) => key)
        }, {
            name: 'Test2',
            email: 'user2@gmail.com',
            password: bcrypt.hash('1234567890', 10).then((key: string) => key)
        }, {
            name: 'Test3',
            email: 'user3@gmail.com',
            password: bcrypt.hash('1234567890', 10).then((key: string) => key)
        }];

        // Test businesses
        this.businessData = [{
            name: 'Test business 1',
            email: 'business@gmail.com',
            password: bcrypt.hash('1234567890', 10).then((key: string) => key)
        }, {
            name: 'Test business 2',
            email: 'business2@gmail.com',
            password: bcrypt.hash('1234567890', 10).then((key: string) => key)
        }];

        console.log('userData in constructor', this.userData);
        console.log('businessData in constructor', this.businessData);
    }

    /** Initializes mongoD */
    private start_mongod() {
        this.mongod = new MongoD({
            dbpath: this.dbpath,
            port: this.dbport
        });
        this.mongod.create_connection();
    }

    /** Establish database connection */
    private start_database() {
        console.log(chalk.blue('Connecting to database'))
        this.db = mongoose.connection;
        this.db.once('open', () => {
            console.log(
                chalk.green('Mongoose has connected to MongoDB')
            );
        })
    }

    /** Initialize and run database */
    public run() {
        this.start_mongod();
        this.start_database();
    }
}

module.exports = DevDatabase;