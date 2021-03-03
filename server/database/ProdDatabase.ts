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
 * MongoDB database interface (production environment)
 */
class ProdDatabase {
    constructor(
        protected mongod: any,
        protected dbname: string,
        protected dbport: string,
        protected dbpath: string,
    ) {
        // Config
        this.dbname = 'castamatch';
        this.dbport = '27018';
        this.dbpath = path.join(__dirname, 'db');
    }


    /** Initializes MongoD */
    private start_mongod() {
        this.mongod = new MongoD({
            dbpath: this.dbpath,
            port: this.dbport
        });
        this.mongod.create_connection();
    }

    /** Establishes database connection */
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

    /** Initialize and run database */
    public async run() {
        console.log(chalk.green('Running database'));
        this.start_mongod();
        this.start_database();
    }
}

module.exports = ProdDatabase;