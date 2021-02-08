
/**
 * Generates link for flv Livestream with given id
 * 
 * @param {String} streamKey 
 * 
 * @returns {{
 *      http: String,
 *      https: String
 * }} Stream link
 */
export default (link) => {
    //http://localhost:8000/live/STREAM_NAME.flv
    const http = `http://${window.location.hostname}:8000/live/${link}.flv`;
    const https = `https://${window.location.hostname}:8443/live/${link}.flv`;
    const rtmp = `rtmp://${window.location.hostname}/live${link}`;
    const hls = `https://localhost:8443/live/${link}/index.m3u8`;


    return {
        http: http,
        https: https,
        rtmp: rtmp,
        hls: hls
    };
}