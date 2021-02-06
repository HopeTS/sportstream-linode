/* 
 * Server configuration
 */

const config = {
    nms: {
        rtmp: {
            logType: 4,
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8000,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        https: {
            port: 8443,
            key: `${process.env.SSL_DIR}privkey.pem`,
            cert: `${process.env.SSL_DIR}cert.pem`,
        },
        trans: {
            ffmpeg: process.env.FFMPEG_PATH,
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        },
        api_url: 'http://localhost:8000/api/streams',
        auth: {
            api : true,
            api_user: 'admin',
            api_pass: '3r32rtes9798h!@$!@#fd',  
        },
    },
    mongodb: {
        dbpath: './server/database/db',
        port: '27018',
        dbname: process.env.DB_NAME
    },
    secret: 'sdkngoih38yghgdsgh845ret34t',
    business_key: 'xqc4TE#3?>692'
};

module.exports = config;