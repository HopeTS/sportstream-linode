/*
 *  Redirects HTTP to HTTPS
 */

const http2https = (req, res, next) => {
    if (process.env.NAME !== 'production') {
        console.log(chalk.blue('Skipping SSL redirect.'));
        return next();
    } else if (req.secure) {
        console.log('Request is secure.')
        return next();
    } else {
        console.log('Redirecting insecure route...')
        res.redirect(`https://${req.url}`);
    }
}

module.exports = http2https;