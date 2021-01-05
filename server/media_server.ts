export {};
/**
 *  Media server for RTMP livestreaming
 */

const NodeMediaServer = require('node-media-server');

const config = require('./config/default').rtmp;
const User = require('./database/schema/Schema').User;
const helpers = require('./helpers/helpers');


/* Media Server */
const nms = new NodeMediaServer(config);

nms.on('prePublish', async (id: any, StreamPath: any, args: any) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    // TODO: Fix this for new database schema
    User.findOne({stream_key: stream_key}, (err: any, user: any) => {
        if (!err) {
            if (!user) {
                let session = nms.getSession(id);
                session.reject();
            } else {
                helpers.generateStreamThumbnail(stream_key);
            }
        }
    });
});

const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};


module.exports = nms;