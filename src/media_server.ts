/*
 *  Media server used for livestreaming
 */
/// <reference path="./config/vars.ts"/>
namespace Castamatch {

const NodeMediaServer = require('node-media-server');
//let config = require('./config/default').rtmp;

export const nms = new NodeMediaServer(config.rtmp);

}