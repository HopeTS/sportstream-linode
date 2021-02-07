/* 
 * Server configuration
 */

const config = {
    mongodb: {
        dbpath: './server/database/db',
        port: '27018',
        dbname: process.env.DB_NAME
    },
    secret: 'sdkngoih38yghgdsgh845ret34t',
    business_key: 'xqc4TE#3?>692'
};

module.exports = config;