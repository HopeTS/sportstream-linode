/* 
 * Server configuration
 */

const config = {
    http: {
        port: process.env.HTTP_PORT,
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
    trans: {
        ffmpeg: '/usr/bin/ffmpeg',
    },
    mongodb: {
        dbpath: './server/database/db',
        port: '27017',
    },
};

module.exports = config;