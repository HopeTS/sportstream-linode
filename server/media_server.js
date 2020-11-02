/*
 *  Media server used for livestreaming
 */

const NodeMediaServer = require('node-media-server');
const config = require('./config/default').rtmp;

nms = new NodeMediaServer(config);


module.exports = nms;