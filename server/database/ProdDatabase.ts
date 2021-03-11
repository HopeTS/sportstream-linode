export {}
const chalk = require('chalk');
const path = require('path');
const mongoose = require('mongoose');

const MongoD = require('./mongod');


/**
 * MongoDB database interface (production environment)
 */
class ProdDatabase {

    // Database
    mongod: any;
    dbname: string;
    dbport: string;
    dbpath: string;
    db: any;


    constructor() {

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