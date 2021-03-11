const chalk = require('chalk');
const path = require('path');
const exec = require('child_process').exec;


/** MongoDB connection object */
class MongoD {

    dbpath: string;
    port: string;


    constructor({ dbpath, port }) {
        this.dbpath = dbpath;
        this.port = port;
    }


    /** Establish  mongod connection */
    create_connection() {

        const command = `mongod --dbpath=${this.dbpath} --port=${this.port}`;
        const rootDir = path.resolve(process.cwd());

        try {
            exec(
                command, 
                {cwd: rootDir}, 
                (error: any) => {
                    if (error) throw new Error(error);
                }
            );
        }

        catch (e: any) {
            console.error(e);
        }
    }
}

export = MongoD;