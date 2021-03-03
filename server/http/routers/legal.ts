export{};
const express = require('express');
const path = require('path');
const chalk = require('chalk');

const publicPath = path.join(__dirname, '../../public/');
const legalPath = path.join(publicPath, 'dist', 'legal');


// Router config
const router = new express.Router();

router.get('/legal/privacy-policy', (req: any, res: any) => {
    try {
        return res.sendFile(path.join(legalPath, 'PrivacyPolicy.pdf'));

    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});

router.get('/legal/terms-of-use', (req: any, res: any) => {
    try {
        return res.sendFile(path.join(legalPath, 'TermsOfUse.pdf'));

    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});


module.exports = router;