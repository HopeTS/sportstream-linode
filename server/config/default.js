/* 
 * Server configuration
 */

const config = {
    http: {
        media_root: './server/media',
        allow_origin: '*',
    },
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30,
    },
    mongodb: {
        dbpath: './server/database/db',
        port: '27018',
    },
    secret: 'sdkngoih38yghgdsgh845ret34t',
    business_key: 'xqc4TE#3?>692'
};

module.exports = config;