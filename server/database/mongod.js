/*
 *  Object that initializes MongoDB
 */

const chalk = require('chalk');
const path = require('path');
const exec = require('child_process').exec;

class MongoD {
    constructor({ dbpath, port }) {
        this.dbpath = dbpath;
        this.port = port;
    }

    create_connection() {
        console.log(chalk.dim.green('Initializing MongoDB'));
        const command = `mongod --dbpath=${this.dbpath} --port=${this.port}`;
        const rootDir = path.resolve(process.cwd());

        exec(command, {cwd: rootDir}, (error, stdout, stderr) => {
            if (error) {
                new Error(console.log(
                    `${chalk.bold.red('MongoDB error:')} ${chalk.red(error)}`
                ));

                return console.log(chalk.bold.red(
                    'Aborting connection to MongoDB'
                ));
            }

            // This won't run unless connection terminates
            console.log(chalk.red('MongoDB closing.'));
        });
    }
}

module.exports = MongoD;