/*
 *  Redirects HTTP to HTTPS
 */

const http2https = (req, res, next) => {
    try {
        if (process.env.NAME !== 'production') {
            console.log(chalk.blue('Skipping SSL redirect.'));
            return next();
        } else if (req.secure) {
            return next();
        } else {
            return res.redirect(`https://${req.hostname}${req.url}`);
        }    
    } catch(e) {
        console.log(chalk.bold.red('Error in HTTPS redirection: '), e);
    }
}

module.exports = http2https;