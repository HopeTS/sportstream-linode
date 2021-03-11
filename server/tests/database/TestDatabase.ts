export {}
import { MongooseDocument } from "mongoose";
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

const MongoD = require('./mongod');
const {
    User, Business, Stream, ConnectionPassword
} = require('./schema/Schema');


/**
 * MongoDB database interface (test environment)
 */
class TestDatabase {

    // Database
    mongod: any;
    dbname: string;
    dbport: string;
    dbpath: string;
    db: any;

    // Collections
    users: any[];
    businesses: any[];
    streams: any[];
    connectionPasswords: any[];

    // Fixture data
    userData: {
        name: string,
        email: string,
        password: string
    }[];
    businessData: {
        name: string,
        email: string,
        password: string
    }[];


    constructor() {

        // Config
        this.dbname = 'castamatchdev';
        this.dbport = '27018';
        this.dbpath = path.join(__dirname, 'db');

        // Test users
        this.userData = [{
            name: 'Test1',
            email: 'user@gmail.com',
            password: '1234test'
        }, {
            name: 'Test2',
            email: 'user2@gmail.com',
            password: '1234test'
        }, {
            name: 'Test3',
            email: 'user3@gmail.com',
            password: '1234test'
        }];

        // Test businesses
        this.businessData = [{
            name: 'Test business 1',
            email: 'business@gmail.com',
            password: '1234test'
        }, {
            name: 'Test business 2',
            email: 'business2@gmail.com',
            password: '1234test'
        }];

        // Initialize collections
        this.users = [];
        this.businesses = [];
        this.streams = [];
        this.connectionPasswords = [];
    }


    /** Initializes MongoD */
    private start_mongod() {
        this.mongod = new MongoD({
            dbpath: this.dbpath,
            port: this.dbport
        });
        this.mongod.create_connection();
    }


    /** Establish database connection */
    private async start_database() {
        console.debug(chalk.blue('Connecting to database'));

        mongoose.connect(
            `mongodb://localhost:${this.dbport}/${this.dbname}`,
            {useNewUrlParser: true, useUnifiedTopology: true}
        );

        this.db = mongoose.connection;
        this.db.once('open', () => {
            console.log(
                chalk.green('Mongoose has connected to MongoDB')
            );
        })
    }


    /** Fetch collections from MongoDB */
    private async fetch_database() {
        console.debug(chalk.blue('Fetching database'));

        // Clear records
        this.users = [];
        this.businesses = [];
        this.streams = [];
        this.connectionPasswords = [];

        try {
            // Fetch users
            this.users = await User.find({}, 
                async (err: Error, docs: MongooseDocument[]) => {
                    if (err) throw err;
                    return docs;
                }
            );

            // Fetch businesses
            this.businesses = await Business.find({},
                async (err: Error, docs: MongooseDocument[]) => {
                    if (err) throw err;
                    return docs;
                }
            );

            // Fetch streams
            this.streams = await Stream.find({},
                async (err: Error, docs: MongooseDocument[]) => {
                    if (err) throw err;
                    return docs;
                }
            );

            // Fetch connectionPasswords
            this.connectionPasswords = await ConnectionPassword.find({},
                async (err: Error, docs: MongooseDocument[]) => {
                    if (err) throw err;
                    return docs;
                }
            );

            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Creates streams */
    public async create_streams() {
        console.debug(chalk.blue('Creating streams'));
        try {

            // 2 streams per business document
            await Promise.all(
                this.businesses.map(async (business) => {
                    for (var i = 0; i < 2; i++) {
                        await business.create_stream();
                    }
                })
            );

            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Starts streams */
    public async start_streams() {
        console.debug(chalk.blue('Starting streams'));
        try {
            await Promise.all(this.streams.map(async (stream) => {
                await stream.start_stream();
            }));
            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Ends streams */
    public async end_streams() {
        console.debug(chalk.blue('Ending streams'));
        try {
            await Promise.all(this.streams.map(async (stream) => {
                await stream.end_stream();
            }));
            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Creates connection passwords in available businesses */
    public async create_connection_passwords() {
        console.debug(chalk.blue('Creating connection passwords'));
        try {

            // 2 passwords per business document
            await Promise.all(
                this.businesses.map(async (business) => {
                    for (var i = 0; i < 2; i++) {
                        await business.generate_connection_password();
                    }
                })
            );

            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Connect a Business to a User */
    public async connect_business() {
        console.debug(chalk.blue('Connecting Business and User'));
        try {
            await this.fetch_database();
            await this.connectionPasswords[0].use(this.users[0]._id);
            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Print ConnectionPassword collection */
    public print_connection_passwords() {
        console.log('Here are all available connectionPasswords:');
        console.log(this.connectionPasswords);
        return;
    }


    /** Initialize and run database */
    public async run() {
        console.debug(chalk.green('Running database'))

        // Startup
        this.start_mongod();
        this.start_database();

        return;
    }
}


module.exports = TestDatabase;