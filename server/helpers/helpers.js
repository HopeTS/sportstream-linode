/**
 * Helper functions
 */


/* External packages */
const spawn = require('child_process').spawn;


/* Internal packages */
const config = require('../config/default');
const cmd = process.env.FFMPEG_PATH;


/* Helper functions */
const generateStreamThumbnail = (stream_key) => {
    /**
     * Uses live stream footage to generate still .png image
     */
    const args = [
        '-y',
        '-i', `${process.env.CORS_ORIGIN}/live/${stream_key}/index.m3u8`,
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        'server/thumbnails/'+stream_key+'.png',
    ];

    spawn(cmd, args, {
        detached: true,
        stdio: 'ignore'
    }).unref();
};

module.exports = {
    generateStreamThumbnail : generateStreamThumbnail
};