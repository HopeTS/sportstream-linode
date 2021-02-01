export {};
/**
 *  Media server for RTMP livestreaming
 */

const NodeMediaServer = require('node-media-server');
const chalk = require('chalk');

const config = require('./config/default').nms;
const Business = require('./database/schema/Schema').Business;
//const helpers = require('./helpers/helpers');


/* Media Server */
const nms = new NodeMediaServer(config);

nms.on('preConnect', (id: any, args: any) => {
    console.log('[NodeEvent on preConnect]', `id=${id} args=${JSON.stringify(args)}`);
});

nms.on('prePublish', async (id: any, StreamPath: any, args: any) => {
    console.log('[nms]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

    // Get stream key
    let streamKey = get_stream_key_from_stream_path(StreamPath);

    await Business.find({}, async function(err: any, docs: any) {
        if (err) throw err;
        await Promise.all(docs.map((doc: any) => {
            console.log(doc.streams.upcoming);
        }))
    })

    // Check for upcoming streams
    await Business.findOne(
        {streams: {upcoming: {"$in": [streamKey]}}},
        async function(err: any, doc: any) {
            if (err) throw err;
            if (!doc) {
                console.log(chalk.yellow('[nms] Invalid business key', streamKey));
                return nms.getSession(id).reject();
            }
            await doc.start_stream(streamKey);
            return console.log(chalk.green(
                `[nms] ${streamKey} is connected to business ${doc.email}`
            ))

        }
    );

    // TODO: Fix this for new database schema
    /* await Business.findOne({stream_key: stream_key}, (err: any, user: any) => {
        console.log('[nms] Ran the nms query');
        if (err) {
            return console.log(err);
        }
        if (!user) {
            console.log('[nms] Invalid business key ')
            return nms.getSession(id).reject();
        }
        return console.log(`[nms] ${stream_key} is connected to business ${user.email}`);
    }); */
});

const get_stream_key_from_stream_path = (path: string) => {
    let parts = path.split('/');
    return parts[2];
};  


module.exports = nms;