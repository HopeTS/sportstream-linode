const chalk = require('chalk');

import { 
    Request, Response, RequestHandler 
} from 'express';

/** Redirects HTTP requests to HTTPS */
const http2https: RequestHandler = (
    req: Request, res: Response, next: Function
) => {
    try {
        if (req.secure) {
            return next();
        } else {
            return res.redirect(`https://${req.hostname}${req.url}`);
        }    
    } catch(e) {
        console.log(chalk.bold.red('Error in HTTPS redirection: '), e);
    }
}

module.exports = http2https;