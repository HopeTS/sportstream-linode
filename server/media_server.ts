export {};
/**
 *  Media server for RTMP livestreaming
 */

const NodeMediaServer = require('node-media-server');

const config = require('./config/default').rtmp;
const Business = require('./database/schema/Schema').Business;
//const helpers = require('./helpers/helpers');


/* Media Server */
const nms = new NodeMediaServer(config);

/* nms.on('prePublish', async (id: any, StreamPath: any, args: any) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[nms]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    // TODO: Fix this for new database schema
    await Business.findOne({stream_key: [stream_key]}, (err: any, user: any) => {
        console.log('[nms] Ran the nms query');
        if (err) {
            return console.log(err);
        }
        if (!user) {
            console.log('[nms] Business not found in ')
            return nms.getSession(id).reject();
        }
        return console.log('[nms] Would have generated thumbnail');
    });
});

const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
}; */


module.exports = nms;