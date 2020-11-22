"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeMediaServer = require('node-media-server');
const config = require('./config/default').rtmp;
const User = require('./database/schema/Schema').User;
const helpers = require('./helpers/helpers');
const nms = new NodeMediaServer(config);
nms.on('prePublish', (id, StreamPath, args) => __awaiter(void 0, void 0, void 0, function* () {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    User.findOne({ stream_key: stream_key }, (err, user) => {
        if (!err) {
            if (!user) {
                let session = nms.getSession(id);
                session.reject();
            }
            else {
                helpers.generateStreamThumbnail(stream_key);
            }
        }
    });
}));
const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
module.exports = nms;
//# sourceMappingURL=media_server.js.map