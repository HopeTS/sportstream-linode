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
 * MongoDB database interface (development environment)
 */
class DevDatabase {

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

        console.log('userData in constructor', this.userData);
        console.log('businessData in constructor', this.businessData);

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


    /** Clear collections */
    private async clear_database() {
        console.debug(chalk.blue('Clearing database'));
        try {

            // Clear User collection
            await User.find({}, (err: any, docs: MongooseDocument[]) => {
                if (err) throw err;
                if (!docs) return;

                docs.forEach((doc: MongooseDocument) => {
                    const id = doc._id
                    User.findByIdAndDelete(id, (err: Error) => {
                        if (err) throw err;
                    });
                });
            });

            // Clear Business collection
            await Business.find({}, (err: Error, docs: MongooseDocument[]) => {
                if (err) throw err;
                if (!docs) return;

                docs.forEach((doc: MongooseDocument) => {
                    const id = doc._id;
                    Business.findByIdAndDelete(id, (err: Error) => {
                        if (err) throw err;
                    });
                });
            });

            // Clear Stream collection
            await Stream.find({}, (err: Error, docs: MongooseDocument[]) => {
                if (err) throw err;
                if (!docs) return;

                docs.forEach((doc: MongooseDocument) => {
                    const id = doc._id;
                    Stream.findByIdAndDelete(id, (err: Error) => {
                        if (err) throw err;
                    });
                });
            });

            // Clear ConnectionPassword collection
            await ConnectionPassword.find({}, 
                (err: Error, docs: MongooseDocument[]) => {
                    if (err) throw err;
                    if (!docs) return;

                    docs.forEach((doc: MongooseDocument) => {
                        const id = doc._id;
                        ConnectionPassword.findByIdAndDelete(id, 
                            (err: Error) => {
                                if (err) throw err;
                            }
                        );
                    });
                }
            );
        }

        catch(e) {
            console.error(e);
        }
    }


    /** Fill in data for database */
    private async populate_database() {
        console.debug(chalk.blue('Populating database'));
        try {

            // Add test users
            await Promise.all(this.userData.map(async (user: any) => {
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    password: user.password
                });

                await newUser.save();
            }));

            // Add test businesses
            await Promise.all(this.businessData.map(async (business: any) => {
                const newBusiness = new Business({
                    name: business.name,
                    email: business.email,
                    password: business.password
                })

                await newBusiness.save();
            }));
            return;
        }

        catch(e) {
            console.error(e);
            return;
        }
    }


    /** Print database collections */
    public print_collections() {
        console.debug(chalk.blue('Printing database contents'));

        // Log users
        console.log('Here are all available users:');
        console.log(this.users);
        console.log(chalk.bold('-----------------------------------------'));

        // Log businesses
        console.log('Here are all available businesses:');
        console.log(this.businesses);
        console.log(chalk.bold('-----------------------------------------'));

        // Log streams
        console.log('Here are all available streams:');
        console.log(this.streams);
        console.log(chalk.bold('-----------------------------------------'));

        // Log connectionPasswords
        console.log('Here are all available connectionPasswords:');
        console.log(this.connectionPasswords);
    }


    /** Creates connection passwords in available businesses */
    public async create_connection_passwords() {
        console.debug(chalk.blue('Creating connection passwords'));
        try {

            // 5 passwords per business document
            await Promise.all(
                this.businesses.map(async (business) => {
                    for (var i = 0; i < 5; i++) {
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


    /** Initialize and run database */
    public async run() {
        console.debug(chalk.green('Running database'))

        // Startup
        this.start_mongod();
        this.start_database();

        // Refresh database
        await this.clear_database();
        await this.populate_database();
        await this.fetch_database();
        this.print_collections();

        //  Test connection passwords
        await this.create_connection_passwords();
        await this.fetch_database();
        this.print_collections();

        return;
    }
}


module.exports = DevDatabase;