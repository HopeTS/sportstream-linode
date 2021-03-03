export {}
import { MongooseDocument } from "mongoose";
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

const MongoD = require('./mongod');
const {
    User, Business
} = require('./schema/Schema');


/**
 * MongoDB database interface (development environment)
 */
class DevDatabase {
    constructor(
        protected mongod: any,
        protected dbname: string,
        protected dbport: string,
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

        protected users: MongooseDocument[],
        protected businesses: MongooseDocument[],
        protected streams: MongooseDocument[],
        protected connectionPasswords: MongooseDocument[],
        protected db: any
    ) {
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
        console.log(chalk.blue('Connecting to database'));

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
        console.log(chalk.blue('Fetching database'));

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

        console.log('Here are the current users', this.users);
        console.log('Here are the current businesses', this.businesses);
        return;
    }

    /** Clear collections */
    private async clear_database() {
        console.log(chalk.blue('Clearing database'));

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

            console.log(chalk.green('Database cleared'));
        }

        catch(e) {
            console.error(e);
        }
    }

    /** Fill in data for database */
    private async populate_database() {
        console.log(chalk.blue('Populating database'));
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
        }

        catch(e) {
            console.error(e);
        }
    }

    /** Initialize and run database */
    public async run() {
        console.log(chalk.green('Running database'))
        this.start_mongod();
        this.start_database();
        await this.clear_database();
        await this.populate_database();
        await this.fetch_database();
    }
}

module.exports = DevDatabase;