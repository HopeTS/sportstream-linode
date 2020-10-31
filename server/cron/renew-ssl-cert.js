const cron = require('node-cron');
const chalk = require('chalk');
const path = require('path');
const exec = require('child_process').exec;


class RenewSSLCert {
    constructor() {
        this.schedule = "5 8 * * Sun";    // Every Sunday
        this.command = "./generate-certificates.sh";
    }

    renew_cert() {
        console.log(chalk.blue('Renewing SSL cert...'));

        // Get to SSL dir
        const rootDir = path.resolve(process.cwd());
        const sslDir = path.join(rootDir, 'server', 'ssl');
        exec(this.command, {cwd: sslDir}, (error, stdout, stderr) => {
            if (error) {
                new Error(console.log(
                    `${chalk.bold.red('Script error:')} ${chalk.red(error)}`
                ));   

                return console.log(chalk.bold.red(
                    'Aborting SSL certification renewal.'
                ));
            }

            console.log(chalk.green('SSL Certificate renewed.'));
        })
    }

    start() {
        console.log(chalk.green('Deploying SSL cert cron job'));
        cron.schedule(this.schedule, () => {
            this.renew_cert();
        })
    }
}


module.exports = RenewSSLCert;