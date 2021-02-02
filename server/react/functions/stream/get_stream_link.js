
/**
 * Generates link for flv Livestream with given id
 * 
 * @param {String} streamKey 
 * 
 * @returns {String} Stream link
 */
export default (link) => {
    //http://localhost:8000/live/STREAM_NAME.flv
    return `http://${window.location.origin}:8000/live/${link}/index.mpd`;
}