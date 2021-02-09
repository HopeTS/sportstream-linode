const express = require('express');
const path = require('path');
const chalk = require('chalk');

const publicPath = path.join(__dirname, '../../public/');
const legalPath = path.join(publicPath, 'dist', 'legal'),


/* Router */
const router = new express.Router();

router.get('/legal/privacy-policy', (req, res) => {
    try {
        return res.sendFile(path.join(publicPath, 'PrivacyPolicy.pdf'));

    } catch(e) {
        res.send();
        console.log(
            chalk.red('An error occured: '),
            '\n',
            `${e}`
        );
    }
});

router.get('/legal/terms-of-use', (req, res) => {
    try {
        return res.sendFile(path.join(publicPath, 'TermsOfUse.pdf'));

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